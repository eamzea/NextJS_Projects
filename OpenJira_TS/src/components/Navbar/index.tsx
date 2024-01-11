import { useContext } from 'react';
import Link from 'next/link';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { UI_CONTEXT, changeTheme, openSidebar } from '@/context/ui';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar: React.FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();
  const { dispatch } = useContext(UI_CONTEXT);

  return (
    <AppBar open={open}>
      <Toolbar>
        <IconButton
          size='medium'
          edge='start'
          color='inherit'
          onClick={() => dispatch(openSidebar())}
          aria-label='menu'
          sx={{ mr: 1, transition: 'all .5s', ...(open && { display: 'none' }) }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Link href='/'>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              OpenJira
            </Typography>
        </Link>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => dispatch(changeTheme())}
        >
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
