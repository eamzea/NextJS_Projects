import { useContext } from 'react';
import { OrderContext } from '../../context/orderContext';
import ProductResume from './ProductResume';

const Resume = () => {
  const {
    actions,
    state: { products },
    dispatch,
  } = useContext(OrderContext);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Adjust quantities
      </p>
      {products.length > 0 ? (
        products.map(prod => <ProductResume key={prod.id} product={prod} />)
      ) : (
        <p className="mt-5 text-sm">There is not any product yet</p>
      )}
    </>
  );
};

export default Resume;
