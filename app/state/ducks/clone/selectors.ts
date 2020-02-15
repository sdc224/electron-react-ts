import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects, toggleCloneProgress } from './actions';
import { ICloneAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useClone = () => {
  const dispatch = useDispatch();
  const cloneState = useSelector((state: ICloneAwareState) => state.clone);
  const getProjects = useCallback(() => dispatch(fetchAllProjects()), [
    dispatch
  ]);
  const showCloneProgress = useCallback(() => dispatch(toggleCloneProgress()), [
    dispatch
  ]);

  return {
    cloneState,
    getProjects,
    showCloneProgress
  };
};
