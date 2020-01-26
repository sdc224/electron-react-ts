import { CounterActionTypes } from './types';

export function increment() {
  return {
    type: CounterActionTypes.INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: CounterActionTypes.DECREMENT_COUNTER
  };
}
