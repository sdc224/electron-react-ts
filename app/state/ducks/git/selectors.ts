import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGitOperationAwareState, GitNamespace } from './types';
import { start as startAction } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const useGit = (namespace: GitNamespace) => {
  const dispatch = useDispatch();

  const gitOperationState = useSelector(
    (state: IGitOperationAwareState) => state.gitOperation[namespace]
  );

  const start = useCallback(
    (params: unknown) => dispatch(startAction(namespace, params)),
    [dispatch]
  );

  return {
    gitOperationState,
    start
  };
};
