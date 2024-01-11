'use client';

import { initialData } from '@/database/seed';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

const product = initialData.products[0];

const getProduct = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/1`, { cache: 'no-store' });
  const projects = await res.json();

  return projects;
};

const Product = async () => {
  const projects = await getProduct();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        lg={7}
      ></Grid>
      <Grid
        item
        xs={12}
        lg={5}
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <Typography
            variant='h1'
            component='h1'
          >
            {product.title}
          </Typography>
          <Typography
            variant='subtitle1'
            component='h2'
          >
            $ {product.price}
          </Typography>
          <Box my={2}>
            <Typography variant='subtitle2'>Quantity</Typography>
          </Box>
          <Button color='secondary' className='circular-btn'>
            Add to cart
          </Button>
          <Chip label='Out of stock' color='error' variant='outlined' />

          <Box mt={3}>
            <Typography variant='subtitle2' fontWeight={500} mb={2}>Description</Typography>
            <Typography variant='body2'>{product.description}</Typography>

          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
