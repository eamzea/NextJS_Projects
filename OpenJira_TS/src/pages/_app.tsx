import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as UI_PROVIDER } from '@/context/ui';
import { ENTRIES_PROVIDER } from '@/context/entries';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import Providers from '@/context';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>
      <Providers providers={[SnackbarProvider, UI_PROVIDER, ENTRIES_PROVIDER]}>
        <Component {...pageProps} />
      </Providers>
    </>
  );
};

export default App;
