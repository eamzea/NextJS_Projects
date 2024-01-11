import { types } from '../types/types';

export const OrderInitialState = {
  client: {},
  products: [],
  total: 0,
};

const OrderReducer = (state = OrderInitialState, action) => {
  switch (action.type) {
    case types.SelectClient:
      return {
        ...state,
        ...action.payload,
      };
      break;
    case types.SelectProduct:
      return {
        ...state,
        ...action.payload,
      };
      break;
    case types.SelectQuantity:
      return {
        ...state,
        products: state.products.map(prod =>
          prod.id === action.payload.id ? action.payload : prod
        ),
      };
      break;
    case types.UpdateTotal:
      return {
        ...state,
        total: state.products.reduce(
          (pv, acu) => (pv += acu.price * acu.quantity),
          0
        ),
      };
      break;

    default:
      return state;
      break;
  }
};

export default OrderReducer;
