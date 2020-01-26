import { Action } from 'redux';
import { CounterActionTypes } from './types';

// eslint-disable-next-line import/prefer-default-export
export function counterReducer(state = 0, action: Action<string>) {
  switch (action.type) {
    case CounterActionTypes.INCREMENT_COUNTER:
      return state + 1;
    case CounterActionTypes.DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
