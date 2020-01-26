import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export const CounterActionTypes = {
  INCREMENT_COUNTER: '@@counter/INCREMENT_COUNTER',
  DECREMENT_COUNTER: '@@counter/DECREMENT_COUNTER'
};

export interface ICounterAwareState {
  counter: number;
}

export type GetState = () => ICounterAwareState;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<ICounterAwareState, Action<string>>;
