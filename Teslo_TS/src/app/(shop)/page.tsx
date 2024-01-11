'use client';
import { Products } from '@/components';
import { initialData } from '@/database/seed';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Typography
        variant='h1'
        component='h1'
      >
        Shop
      </Typography>
      <Typography variant='h2'>All producst</Typography>
      <Products products={initialData.products} />
    </>
  );
};

export default Home;
