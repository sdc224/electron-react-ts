import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IForkUpdateOptions } from '@commands/models/forkUpdate';
import {
  fetchClonableProjects,
  toggleCloneProgress,
  fetchForkableProjects,
  toggleForkProgress,
  startCloning as clone,
  startForking as fork,
  toggleForkUpdateProgress,
  startForkUpdating as forkUpdate
} from './actions';
import { IOperationAwareState } from './types';
import { IProgressBarSelector } from '../progress/types';

export const useClone = () => {
  const dispatch = useDispatch();
  const cloneState = useSelector((state: IOperationAwareState) => state.clone);
  const getProjects = useCallback(() => dispatch(fetchClonableProjects()), [
    dispatch
  ]);

  const showCloneProgress = useCallback(() => dispatch(toggleCloneProgress()), [
    dispatch
  ]);

  const startCloning = useCallback(
    (projects: IRepository[], progressState: IProgressBarSelector) =>
      dispatch(clone(projects, progressState)),
    [dispatch]
  );

  return {
    cloneState,
    getProjects,
    showCloneProgress,
    startCloning
  };
};

export const useFork = () => {
  const dispatch = useDispatch();
  const forkState = useSelector((state: IOperationAwareState) => state.fork);

  const getProjects = useCallback(() => dispatch(fetchForkableProjects()), [
    dispatch
  ]);

  const showForkProgress = useCallback(() => dispatch(toggleForkProgress()), [
    dispatch
  ]);

  const startForking = useCallback(
    (projects: IRepository[], progressState: IProgressBarSelector) =>
      dispatch(fork(projects, progressState)),
    [dispatch]
  );

  return {
    forkState,
    getProjects,
    showForkProgress,
    startForking
  };
};

export const useForkUpdate = () => {
  const dispatch = useDispatch();

  const showForkUpdateProgress = useCallback(
    () => dispatch(toggleForkUpdateProgress()),
    [dispatch]
  );

  const startForkUpdating = useCallback(
    (
      projects: IRepository[],
      data: IForkUpdateOptions,
      progressState: IProgressBarSelector
    ) => dispatch(forkUpdate(projects, data, progressState)),
    [dispatch]
  );

  return {
    showForkUpdateProgress,
    startForkUpdating
  };
};
