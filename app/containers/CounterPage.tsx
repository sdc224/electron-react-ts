import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import Counter from '@components/Counter';
import counterModule from '@ducks/counter/module';
import { useCounter } from '@ducks/counter/selectors';

export default function SideDrawerModule() {
  const { counter, increment, decrement } = useCounter();

  return (
    <DynamicModuleLoader modules={[counterModule]}>
      <Counter counter={counter} increment={increment} decrement={decrement} />
    </DynamicModuleLoader>
  );
}
