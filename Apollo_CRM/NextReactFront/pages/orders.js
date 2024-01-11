import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GET_EXECUTIVE_CLIENTS, GET_EXECUTIVE_ORDERS } from '../api/queries';
import Layout from '../components/Layout/Layout';
import Loading from '../components/common/Loading';
import Client from '../components/Client';
import Order from '../components/Order';

const Orders = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_EXECUTIVE_ORDERS);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getExecutiveOrders } = data;

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
        <Link href="/new-order">
          <a className="text-xs text-white bg-blue-800 px-3 py-1 rounded-full uppercase shadow-md hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transform duration-500 focus:outline-none">
            New Order +
          </a>
        </Link>
      </div>

      {getExecutiveOrders.length === 0 ? (
        <p className="mt-5 text-center text-2xl">There aren't orders yet'</p>
      ) : (
        getExecutiveOrders.map(order => <Order key={order.id} order={order} />)
      )}
    </Layout>
  );
};

export default Orders;
