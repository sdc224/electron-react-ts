import React, { Suspense } from 'react';
import Loading from '@components/Loading';

const HomeComponent = React.lazy(() => import('./Home'));
const DashboardComponent = React.lazy(() => import('./Dashboard'));
const CloneComponent = React.lazy(() => import('./Clone'));
const OperationsComponent = React.lazy(() => import('./Operations'));

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

const Clone = () => (
  <Suspense fallback={<Loading />}>
    <CloneComponent />
  </Suspense>
);

const Operations = () => (
  <Suspense fallback={<Loading />}>
    <OperationsComponent />
  </Suspense>
);

export { Home, Dashboard, Clone, Operations };
