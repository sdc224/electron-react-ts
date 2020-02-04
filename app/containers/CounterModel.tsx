import React, { Suspense } from 'react';
import { useCounter } from '@ducks/counter/selectors';
import Loading from '@components/Loading';

const Counter = React.lazy(() => import('@components/Counter'));

export default function CounterModel() {
  const { counter, increment, decrement } = useCounter();

  return (
    <Suspense fallback={<Loading />}>
      <Counter counter={counter} increment={increment} decrement={decrement} />
    </Suspense>
  );
}
