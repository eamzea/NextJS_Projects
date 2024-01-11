'use client';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href='/'
          passHref
        >
          <Button sx={{ ':hover': { backgroundColor: 'inherit' } }}>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Button>
        </NextLink>

        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NextLink
            href='/category/men'
            passHref
          >
            <Button>
              <Typography variant='h6' fontSize={12}>Men</Typography>
            </Button>
          </NextLink>
          <NextLink
            href='/category/women'
            passHref
          >
            <Button>
              <Typography variant='h6' fontSize={12}>Women</Typography>
            </Button>
          </NextLink>
          <NextLink
            href='/category/kids'
            passHref
          >
            <Button>
              <Typography variant='h6' fontSize={12}>Kids</Typography>
            </Button>
          </NextLink>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink
          href='/category/kids'
          passHref
          style={{margin: '0 1rem'}}
        >
          <IconButton>
            <Badge
              color='secondary'
              badgeContent={2}
            >
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>
        <Button>
          <Typography variant='h6' fontSize={12}>Menu</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
