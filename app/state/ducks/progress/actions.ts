import { action } from 'typesafe-actions';
import { IProgress } from '@app/commands/lib/progress/definitions';
import { ProgressActionTypes } from './types';

export const report = (progress: IProgress) =>
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
