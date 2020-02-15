import { IProgress } from '@app/commands/lib/progress/definitions';

export const ProgressActionTypes = {
  PROGRESS_REPORT: '@@progress/PROGRESS_REPORT',
  PROGRESS_COMPLETE: '@@progress/PROGRESS_COMPLETE',
  PROGRESS_ERROR: '@@progress/PROGRESS_ERROR',
  PROGRESS_BUFFER_REPORT: '@@progress/PROGRESS_BUFFER_REPORT',
  PROGRESS_BUFFER_ERROR: '@@progress/PROGRESS_BUFFER_ERROR'
};

export type ProgressBarProps = {
  color?: 'primary' | 'secondary';
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value?: number;
  valueBuffer?: number;
};

export interface IProgressBarState extends IProgress {
  // TODO : Change this context to some selected strings...clone, fork, fetch etc
  kind?: string;
  error?: string;
  valueBuffer?: number;
  valueBufferError?: string;
}

export interface IProgressBarSelector {
  progressState: IProgressBarState;
  handleProgress: (
    progress: IProgressBarState
  ) => {
    type: string;
    payload?: IProgressBarState;
    error?: string;
  };
}

export interface IProgressBarAwareState {
  progress: IProgressBarState;
}
