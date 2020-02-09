import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clone as cloneAction } from './actions';
import { IOperationAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useOperation = () => {
  const operationState = useSelector(
    (state: IOperationAwareState) => state.operation
  );
  const dispatch = useDispatch();

  const clone = useCallback(() => dispatch(cloneAction()), [dispatch]);

  return { operationState, clone };
};
