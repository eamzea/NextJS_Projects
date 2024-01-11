import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../api/queries';
import Loading from './Loading';

const Header = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return router.push('/login');
  }

  const { name, lastName } = data.getUser;

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex justify-end items-center border-b border-gray-300 mb-3">
      <p className="mr-5">Hello: {data.getUser.name}</p>
      <button
        type="button"
        className="flex bg-blue-800 w-auto px-3 py-1 my-3 uppercase text-white rounded-full text-xs shadow-md hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transform duration-500 focus:outline-none"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default Header;
