import React from 'react';
import Counter from '@components/Counter';
import { useCounter } from '@ducks/counter/selectors';

export default function CounterModel() {
  const { counter, increment, decrement } = useCounter();

  return (
    <Counter counter={counter} increment={increment} decrement={decrement} />
  );
}
