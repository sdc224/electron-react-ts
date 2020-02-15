import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IProgressBarAwareState,
  IProgressBarSelector,
  IProgressBarState
} from './types';
import { report } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const useProgress = (): IProgressBarSelector => {
  const progressState = useSelector(
    (state: IProgressBarAwareState) => state.progress
  );
  const dispatch = useDispatch();
  const handleProgress = useCallback(
    (progress: IProgressBarState) => dispatch(report(progress)),
    [dispatch]
  );
  return { progressState, handleProgress };
};
