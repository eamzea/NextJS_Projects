import { createContext, useReducer } from 'react';
import OrderActions from '../actions/orderActions';
import OrderReducer, { OrderInitialState } from '../reducer/orderReducer';

export const OrderContext = createContext();

const OrderCtx = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, OrderInitialState);

  return (
    <OrderContext.Provider value={{ state, actions: OrderActions, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderCtx;
