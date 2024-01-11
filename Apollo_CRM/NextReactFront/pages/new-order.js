import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_ORDER } from '../api/mutations';
import { OrderContext } from '../context/orderContext';
import Layout from '../components/Layout/Layout';
import AssignClient from '../components/orders/assignClient';
import AssignProducts from '../components/orders/AssignProducts';
import Resume from '../components/orders/Resume';
import Total from '../components/orders/Total';
import Swal from 'sweetalert2';
import { GET_EXECUTIVE_ORDERS } from '../api/queries';

const newOrder = () => {
  const {
    state: { total, client, products },
    actions,
    dispatch,
  } = useContext(OrderContext);
  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getExecutiveOrders } = cache.readQuery({
        query: GET_EXECUTIVE_ORDERS,
      });

      cache.writeQuery({
        query: GET_EXECUTIVE_ORDERS,
        data: {
          getExecutiveOrders: [...getExecutiveOrders, newOrder],
        },
      });
    },
  });
  const [msgState, setMsgState] = useState(null);
  const router = useRouter();

  const validateOrder = () => {
    return total > 0 || client.length > 0 ? '' : 'opacity-50 not-allowed';
  };

  const handleNewOrder = async () => {
    const { id: clientID } = client;
    const prods = products.map(({ id, quantity, name, price }) => {
      return { id, quantity, name, price };
    });

    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: clientID,
            total,
            orders: prods,
          },
        },
      });

      router.push('/orders');

      Swal.fire('Correct', 'Order created successfully', 'success');
    } catch (error) {
      console.log(error);
      setMsgState(error.message.replace('Graphql error: ', ''));

      setTimeout(() => {
        setMsgState(null);
      }, 1500);
    }
  };

  const showError = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto shadow-md rounded-sm">
        <p className="text-xl">{msgState}</p>
      </div>
    );
  };

  return (
    <Layout>
      {msgState && showError()}
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <AssignClient />
      <AssignProducts />
      <Resume />
      <Total />
      <button
        type="button"
        onClick={handleNewOrder}
        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
      >
        Register Order
      </button>
    </Layout>
  );
};

export default newOrder;
