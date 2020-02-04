import React, { Suspense } from 'react';
import Loading from '@components/Loading';

const HomePageComponent = React.lazy(() => import('@components/Home'));

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageComponent />
    </Suspense>
  );
}
