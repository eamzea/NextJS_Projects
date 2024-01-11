import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { GET_PRODUCTS } from '../../api/queries';
import Loading from '../common/Loading';
import { OrderContext } from '../../context/orderContext';

const AssignProducts = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [productsState, setProductsState] = useState([]);
  const { state, actions, dispatch } = useContext(OrderContext);

  useEffect(() => {
    dispatch(actions.addProduct(state.products, productsState));
    dispatch(actions.updateTotal());
  }, [productsState]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getProducts } = data;

  const handleProduct = product => setProductsState(product);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Select or search the products
      </p>
      <Select
        className="mt-3"
        options={getProducts}
        isMulti
        onChange={handleProduct}
        placeholder="Search or Choose Products"
        getOptionValue={options => options.id}
        getOptionLabel={options =>
          `${options.name} - ${options.inventory} Available`
        }
        on
      />
    </>
  );
};

export default AssignProducts;
