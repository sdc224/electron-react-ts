import { action } from 'typesafe-actions';
import { CounterActionTypes } from './types';

export const increment = () => action(CounterActionTypes.INCREMENT_COUNTER);

export const decrement = () => action(CounterActionTypes.DECREMENT_COUNTER);
