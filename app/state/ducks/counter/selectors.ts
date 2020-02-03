import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment as incrementAction,
  decrement as decrementAction
} from './actions';
import { ICounterAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useCounter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: ICounterAwareState) => state.counter);
  const increment = useCallback(() => dispatch(incrementAction()), [dispatch]);
  const decrement = useCallback(() => dispatch(decrementAction()), [dispatch]);

  return { counter, increment, decrement };
};
