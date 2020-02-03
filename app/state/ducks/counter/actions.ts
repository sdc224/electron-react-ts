import { action } from 'typesafe-actions';
import { CounterActionTypes } from './types';

export function increment() {
  action(CounterActionTypes.INCREMENT_COUNTER);
}

export function decrement() {
  action(CounterActionTypes.DECREMENT_COUNTER);
}
