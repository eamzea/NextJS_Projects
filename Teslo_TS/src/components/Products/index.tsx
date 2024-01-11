'use client'

import { Grid } from '@mui/material';
import Product from '../Product';

interface Props {
  products: Product[]
}

const Products: React.FC<Props> = ({products}) => {
  return (
    <Grid
      container
      spacing={4}
    >
      {products.map(product => (
        <Product
          product={product}
          key={product.slug}
        />
      ))}
    </Grid>
  );
}

export default Products
