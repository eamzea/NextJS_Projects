import { types } from '../types/types';

const addClient = client => {
  return {
    type: types.SelectClient,
    payload: { client },
  };
};

const addProduct = (productState, product) => {
  let newState;

  if (productState.length > 0) {
    newState = product.map(prod => {
      const newObj = productState.find(pr => pr.id === prod.id);
      return { ...prod, ...newObj };
    });
  } else {
    newState = product;
  }

  return {
    type: types.SelectProduct,
    payload: { products: newState },
  };
};

const addQuantity = product => {
  return {
    type: types.SelectQuantity,
    payload: product,
  };
};

const updateTotal = () => {
  return {
    type: types.UpdateTotal,
  };
};

const OrderActions = {
  addClient,
  addProduct,
  addQuantity,
  updateTotal,
};

export default OrderActions;
