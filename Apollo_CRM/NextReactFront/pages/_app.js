import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import OrderCtx from '../context/orderContext';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderCtx>
        <Component {...pageProps} />
      </OrderCtx>
    </ApolloProvider>
  );
}

export default MyApp;
