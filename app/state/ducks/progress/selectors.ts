import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IProgressBarAwareState,
  IProgressBarSelector,
  IProgressBarState,
  IProgressStartAction
} from './types';
import { start, report, complete } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const useProgress = (): IProgressBarSelector => {
  const progressState = useSelector(
    (state: IProgressBarAwareState) => state.progress
  );

  const dispatch = useDispatch();

  const progressStart = useCallback(
    (progress: IProgressStartAction) => dispatch(start(progress)),
    [dispatch]
  );
  const handleProgress = useCallback(
    (progress: IProgressBarState) => dispatch(report(progress)),
    [dispatch]
  );
  const progressComplete = useCallback(() => dispatch(complete()), [dispatch]);
  return { progressState, progressStart, handleProgress, progressComplete };
};
