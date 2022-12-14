import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';



const SalesReport = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={`${requestedUrl}/`} component={lazy(() => import('./ProjectWorkedHours'))} />
        <Route component={lazy(() => import('../404'))} />
      </Switch>
    </Suspense>
  );
};

export default SalesReport;
