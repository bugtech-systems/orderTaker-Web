import React from 'react';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

//Components
import ProductList from './ProductList';

const breadcrumbs = [
  // { label: 'Products', link: '/products' }
];

const Sales = () => {
  return (
    <PageContainer heading="Product List" breadcrumbs={breadcrumbs}>
      <ProductList />
    </PageContainer>
  );
};

export default Sales;
