import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/orderContext';

const ProductResume = ({ product }) => {
  const [quantityState, setQuantityState] = useState(1);
  const [errorState, setErrorState] = useState(null);
  const { actions, dispatch } = useContext(OrderContext);

  useEffect(() => {
    updateQuantity();
  }, [quantityState]);

  const { name, price, inventory } = product;

  const updateQuantity = () => {
    const newProduct = { ...product, quantity: quantityState };
    dispatch(actions.addQuantity(newProduct));
    dispatch(actions.updateTotal());
  };

  const handleChange = ({ target: { value } }) => {
    const n = value * 1;
    if (!isNaN(n)) {
      if (n <= inventory) {
        setQuantityState(n);
        setErrorState(null);
      } else {
        setErrorState(`Quantity could not be greater than products inventory`);
      }
    } else {
      setErrorState('Enter only numbers');
    }
  };

  return (
    <div className="md:flex md:justify-between md:items-center mt-5 flex-wrap">
      <div className="md:w-4/6 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p className="text-sm">$ {price}</p>
      </div>
      <input
        type="text"
        placeholder="Quantity"
        className="shadow apperance-none border rounded md:w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4 "
        onChange={handleChange}
        value={quantityState}
      />
      <div className="w-full block">
        {errorState && (
          <p className="text-xs text-red-300 text-right m-0 mt-3">
            {errorState}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductResume;
