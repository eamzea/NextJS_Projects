import { useEffect, useState } from 'react';
import DeleteIcon from '../public/icons/delete.svg';
import PhoneIcon from '../public/icons/phone.svg';
import MailIcon from '../public/icons/mail.svg';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER, DELETE_ORDER } from '../api/mutations';
import Swal from 'sweetalert2';
import { GET_EXECUTIVE_ORDERS } from '../api/queries';

const Order = ({ order: { id, orders, total, state, client } }) => {
  const [statusState, setStatusState] = useState(state);
  const [classState, setClassState] = useState('');
  const [updateOrder] = useMutation(UPDATE_ORDER, {
    update(cache, { data: { updateOrder } }) {
      const { getExecutiveOrders } = cache.readQuery({
        query: GET_EXECUTIVE_ORDERS,
      });

      cache.writeQuery({
        query: GET_EXECUTIVE_ORDERS,
        data: {
          getExecutiveOrders: [...getExecutiveOrders, UPDATE_ORDER],
        },
      });
    },
  });

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getExecutiveOrders } = cache.readQuery({
        query: GET_EXECUTIVE_ORDERS,
      });

      cache.writeQuery({
        query: GET_EXECUTIVE_ORDERS,
        data: {
          getExecutiveOrders: getExecutiveOrders.filter(
            order => order.id !== id
          ),
        },
      });
    },
  });

  useEffect(() => {
    handleClassOrder();
  }, [statusState]);

  const handleClassOrder = () => {
    console.log(statusState);
    if (statusState === 'COMPLETED') {
      setClassState('border-green-500');
    } else if (statusState === 'PENDING') {
      setClassState('border-yellow-500');
    } else {
      setClassState('border-red-800');
    }
  };

  const handleState = async ({ target: { value } }) => {
    try {
      const {
        data: {
          updateOrder: { state: stateUpdated },
        },
      } = await updateOrder({
        variables: {
          id,
          input: {
            state: value,
            client: client.id,
          },
        },
      });

      setStatusState(stateUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const swal = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this Order?',
        showDenyButton: true,
        denyButtonText: 'Keep',
        confirmButtonText: `Delete`,
        confirmButtonColor: 'red',
        denyButtonColor: 'green',
        allowEnterKey: false,
        allowOutsideClick: false,
      });

      if (swal.isConfirmed) {
        const {
          data: { deleteOrder: order },
        } = await deleteOrder({
          variables: {
            id,
          },
        });

        Swal.fire(
          'Deleted!',
          `The Order: ${order.id} has been deleted`,
          'success'
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Deleted!', 'Something went wrong');
    }
  };

  return (
    <div
      className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg ${classState} border-t-4`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Client: {client.name} {client.lastName}
        </p>
        {client.email && (
          <p className="flex items-center">
            <MailIcon className="w-4 h-4 text-red mr-3" />
            {client.email}
          </p>
        )}
        {client.phone && (
          <p className="flex items-center">
            <PhoneIcon className="w-4 h-4 text-red mr-3" />
            {client.phone}
          </p>
        )}
        <h2 className="text-gray-800 font-bold mt-10">Status: {statusState}</h2>
        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-500 uppercase text-xs font-bold"
          value={statusState}
          onChange={handleState}
        >
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resume</h2>
        {orders.map(prod => (
          <div key={prod.id} className="mt-4">
            <p className="text-sm text-gray-600">Product: {prod.name}</p>
            <p className="text-sm text-gray-600">Quantity: {prod.quantity}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-e font-bold">
          Total: <span className="font-light">${total}</span>
        </p>
        <button
          className="flex items-center justify-around mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded uppercase leading-tight text-xs font-bold w-4/12"
          onClick={handleDelete}
        >
          Delete order
          <DeleteIcon className="w-1/6 h-1/6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Order;
