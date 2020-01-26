import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export const CounterActionTypes = {
  INCREMENT_COUNTER: '@@counter/INCREMENT_COUNTER',
  DECREMENT_COUNTER: '@@counter/DECREMENT_COUNTER'
};

export type CounterStateType = {
  counter: number;
};

export type GetState = () => CounterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<CounterStateType, Action<string>>;
