import { useContext } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../Navbar';
import Sidebar from '../Navbar/Sidebar';
import { UI_CONTEXT } from '@/context/ui';

interface LayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DashboardContainer = styled(Box)<{ open: boolean }>(({ open, theme }) => ({
  padding: open ? '4.5rem 0.5rem 0 16rem' : '4.5rem 0.5rem 0 4.5rem',
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Layout: React.FC<LayoutProps> = ({ title = 'OpenJira', children }) => {
  const { isSidebarOpen, dispatch } = useContext(UI_CONTEXT);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar open={isSidebarOpen} />
      <Sidebar open={isSidebarOpen} />
      <DashboardContainer open={isSidebarOpen}>{children}</DashboardContainer>
    </Box>
  );
};

export default Layout;
