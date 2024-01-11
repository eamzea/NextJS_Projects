import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { GET_EXECUTIVE_CLIENTS } from '../../api/queries';
import { OrderContext } from '../../context/orderContext';
import Loading from '../common/Loading';

const AssignClient = () => {
  const [clientState, setClientState] = useState([]);
  const { data, loading, error } = useQuery(GET_EXECUTIVE_CLIENTS);
  const { actions, dispatch } = useContext(OrderContext);

  useEffect(() => {
    dispatch(actions.addClient(clientState));
  }, [clientState]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getExecutiveClients } = data;

  const handleClient = client => setClientState(client);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Assign a Client to the Order
      </p>
      <Select
        className="mt-3"
        options={getExecutiveClients}
        onChange={handleClient}
        placeholder="Search or Choose a Client"
        getOptionValue={options => options.id}
        getOptionLabel={options => options.name}
      />
    </>
  );
};

export default AssignClient;
