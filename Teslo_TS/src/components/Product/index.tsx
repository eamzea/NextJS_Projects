'use client'
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface Props {
  product: Product;
}
const Product: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? `products/${product.images[0]}` : `products/${product.images[1]}`;
  }, [isHovered, product])

  return (
    <Grid
      item
      xs={6}
      md={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href='product/slug' passHref prefetch={false}>
          <CardActionArea>
            <CardMedia
              className='fadeIn'
              component='img'
              src={productImage}
              alt={product.title}
            />
          </CardActionArea>
        </Link>
      </Card>
      <Box
        mt={1}
        className='fadeIn'
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>$ {product.price}</Typography>
      </Box>
    </Grid>
  );
};

export default Product;
