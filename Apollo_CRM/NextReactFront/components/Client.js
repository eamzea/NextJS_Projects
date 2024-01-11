import Router from 'next/router';
import DeleteIcon from '../public/icons/delete.svg';
import EditIcon from '../public/icons/edit.svg';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../api/mutations';
import { GET_EXECUTIVE_CLIENTS } from '../api/queries';

const Client = ({ client: { id, name, lastName, company, email } }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getExecutiveClients } = cache.readQuery({
        query: GET_EXECUTIVE_CLIENTS,
      });

      cache.writeQuery({
        query: GET_EXECUTIVE_CLIENTS,
        data: {
          getExecutiveClients: getExecutiveClients.filter(
            client => client.id !== id
          ),
        },
      });
    },
  });

  const confirmDelete = async () => {
    try {
      const swal = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this Client?',
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
          data: { deleteClient: client },
        } = await deleteClient({
          variables: {
            id,
          },
        });

        Swal.fire(
          'Deleted!',
          `The Client: ${client.name} has been deleted`,
          'success'
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Deleted!', 'Something went wrong');
    }
  };

  const handleEdit = () => {
    Router.push({
      pathname: '/edit-client/[id]',
      query: { id },
    });
  };

  return (
    <>
      <tr>
        <td className="border px-4 py-2">
          {name} {lastName}
        </td>
        <td className="border px-4 py-2">{company} </td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="h-7 w-full bg-blue-700 rounded-md flex justify-center items-center focus:outline-none outline-none duration-500 hover:bg-blue-900 "
          >
            <EditIcon className="w-4/6 h-4/6 text-white" onClick={handleEdit} />
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            type="button"
            className="h-7 w-full bg-red-700 rounded-md flex justify-center items-center focus:outline-none outline-none duration-500 hover:bg-red-900 "
            onClick={confirmDelete}
          >
            <DeleteIcon className="w-4/6 h-4/6 text-white" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Client;
