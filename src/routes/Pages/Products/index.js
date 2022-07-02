import React from 'react';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';

//Components
import ProductList from './ProductList';
import PopularProducts from './PopularProducts';


const breadcrumbs = [
  // { label: 'Products', link: '/products' }
];

const Sales = () => {
  return (
    <PageContainer heading="Product List" breadcrumbs={breadcrumbs}>
         <GridContainer>
         <Grid item xs={12} xl={12}>
          <PopularProducts />
        </Grid>
        <Grid item xs={12} xl={12}>
        <ProductList />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Sales;
