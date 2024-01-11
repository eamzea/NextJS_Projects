import { Navbar, SideMenu } from '@/components';
import AppProviders from '@/context';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProviders>
      <Navbar />
      <SideMenu />
      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}>{children}</main>
    </AppProviders>
  );
};

export default ShopLayout;
