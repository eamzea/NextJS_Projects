'use client'

import Head from 'next/head';
import ShopLayout from './(shop)/layout';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <ShopLayout>
        <Box
          display='flex'
          flexDirection={{xs: 'column', lg: 'row'}}
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 200px)'
        >
          <Typography
            variant='h1'
            component='h1'
            fontSize={{xs: 100, lg: 150}}
            fontWeight={100}
          >
            404 |
          </Typography>
          <Typography
            fontSize={{xs: 50, lg: 100}}
            fontWeight={100}
            marginLeft={5}
          >
            Not Found
          </Typography>
        </Box>
      </ShopLayout>
    </>
  );
};

export default NotFound;
