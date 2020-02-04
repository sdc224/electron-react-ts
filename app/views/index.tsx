import React, { Suspense } from 'react';
import Loading from '@components/Loading';

const HomeComponent = React.lazy(() => import('./Home'));
const DashboardComponent = React.lazy(() => import('./Dashboard'));

const Home = () => (
  <Suspense fallback={<Loading />}>
    <HomeComponent />
  </Suspense>
);

const Dashboard = () => (
  <Suspense fallback={<Loading />}>
    <DashboardComponent />
  </Suspense>
);

export { Home, Dashboard };
