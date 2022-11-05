import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';



const SalesReport = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/sales`} /> */}
        <Route path={`${requestedUrl}/`} component={lazy(() => import('./ProjectWorkedHours'))} />
        {/* <Route path={`${requestedUrl}/unpaid`} component={lazy(() => import('./Remittances'))} />
        <Route path={`${requestedUrl}/purchases`} component={lazy(() => import('../Profile'))} />

        <Route path={`${requestedUrl}/expenses`} component={lazy(() => import('../Settings'))} />
         {/* <Route path={`${requestedUrl}/crm`} component={lazy(() => import('./Crm'))} /> */}
        {/* <Route path={`${requestedUrl}/eCommerce`} component={lazy(() => import('./ECommerce'))} /> */}
        {/* <Route path={`${requestedUrl}/news`} component={lazy(() => import('./News'))} /> */}
        {/* <Route path={`${requestedUrl}/misc`} component={lazy(() => import('./Misc'))} /> */} */}
        <Route component={lazy(() => import('../404'))} />
      </Switch>
    </Suspense>
  );
};

export default SalesReport;
