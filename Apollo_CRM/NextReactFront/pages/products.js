import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GET_PRODUCTS } from '../api/queries';
import Loading from '../components/common/Loading';
import Layout from '../components/Layout/Layout';
import Product from '../components/Product';

const Products = () => {
  const router = useRouter();
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_PRODUCTS);

  useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getProducts } = data;

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-light">Products</h1>
        <Link href="/new-product">
          <a className="text-xs text-white bg-blue-800 px-3 py-1 rounded-full uppercase shadow-md hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transform duration-500 focus:outline-none">
            New Product +
          </a>
        </Link>
      </div>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <td className="w-3/12 p-2 rounded-tl-lg">Name</td>
            <td className="w-3/12 p-2">Price</td>
            <td className="w-3/12 p-2">Inventory</td>
            <td className="w-1/12 p-2 text-center">Edit</td>
            <td className="w-1/12 p-2 text-center rounded-tr-lg">Delete</td>
          </tr>
        </thead>
        <tbody className="bg-white">
          {getProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
