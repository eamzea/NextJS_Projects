import Head from 'next/head';
import SideBar from '../common/SideBar';
import { useRouter } from 'next/router';
import Header from '../common/Header';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>CRM</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
          integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
          crossOrigin="anonymous"
        />
      </Head>

      {router.pathname === '/login' || router.pathname === '/sign-up' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <SideBar />
            <main className="sm:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
