import { action } from 'typesafe-actions';
import {
  ProgressActionTypes,
  IProgressBarState,
  IProgressStartAction
} from './types';

export const start = (progressStart: IProgressStartAction) =>
  action(ProgressActionTypes.PROGRESS_START, progressStart);

export const report = (progress: IProgressBarState) =>
  action(ProgressActionTypes.PROGRESS_REPORT, progress);

// TODO
// Others are unused right now
export const complete = () => action(ProgressActionTypes.PROGRESS_COMPLETE);

export const progressError = (error: string) =>
  action(ProgressActionTypes.PROGRESS_ERROR, undefined, undefined, error);

export const reportBuffer = (valueBuffer: number) =>
  action(ProgressActionTypes.PROGRESS_BUFFER_REPORT, valueBuffer);

export const progressBufferError = (error: string) =>
  action(
    ProgressActionTypes.PROGRESS_BUFFER_ERROR,
    undefined,
    undefined,
    error
  );
