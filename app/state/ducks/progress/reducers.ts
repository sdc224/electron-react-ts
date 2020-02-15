import { Action } from 'redux';
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import { IProgress } from '@app/commands/lib/progress/definitions';
import { ProgressActionTypes, IProgressBarState } from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: IProgressBarState = {
  title: '',
  value: 0,
  description: '',
  error: '',
  valueBuffer: 0,
  valueBufferError: undefined
};

// eslint-disable-next-line import/prefer-default-export
export const progressReducer = (
  state: IProgressBarState = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, IProgress> &
    ErrorAction
): IProgressBarState => {
  switch (action.type) {
    case ProgressActionTypes.PROGRESS_REPORT:
      return {
        ...state,
        value: action.payload.value,
        title: action.payload.title,
        description: action.payload.description
      };

    case ProgressActionTypes.PROGRESS_ERROR:
      return { ...state, error: action.error };

    // TODO
    // case ProgressActionTypes.PROGRESS_BUFFER_REPORT:
    //   return { ...state, valueBuffer: action.payload };

    case ProgressActionTypes.PROGRESS_BUFFER_ERROR:
      return { ...state, valueBufferError: action.error };

    default:
      return state;
  }
};
