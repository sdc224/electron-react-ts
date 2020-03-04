import React, { Suspense } from 'react';
import Loading from '@components/Loading';

const HomeView = React.lazy(() => import('./Home'));
const DashboardView = React.lazy(() => import('./Dashboard'));
const OperationsView = React.lazy(() => import('./Operations'));
const WelcomeView = React.lazy(() => import('./Welcome'));
const NotFoundView = React.lazy(() => import('./NotFound'));

const Welcome = () => (
  <Suspense fallback={<Loading />}>
    <WelcomeView />
  </Suspense>
);

const Home = () => (
  <Suspense fallback={<Loading />}>
    <HomeView />
  </Suspense>
);

const Dashboard = () => (
  <Suspense fallback={<Loading />}>
    <DashboardView />
  </Suspense>
);

const Operations = () => (
  <Suspense fallback={<Loading />}>
    <OperationsView />
  </Suspense>
);

const NotFound = () => (
  <Suspense fallback={<Loading />}>
    <NotFoundView />
  </Suspense>
);

export { Welcome, Home, Dashboard, Operations, NotFound };
