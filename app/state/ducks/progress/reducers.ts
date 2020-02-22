import { Action } from 'redux';
import { TypeConstant, PayloadAction } from 'typesafe-actions';
import {
  ProgressActionTypes,
  IProgressBarState,
  IProgressStartAction
} from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: IProgressBarState = {
  kind: '',
  init: false,
  progressType: 'circular',
  variant: 'indeterminate',
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
    PayloadAction<TypeConstant, IProgressBarState & IProgressStartAction> &
    ErrorAction
): IProgressBarState => {
  switch (action.type) {
    case ProgressActionTypes.PROGRESS_START:
      return {
        ...state,
        init: true,
        value: 0,
        progressType: action.payload.progressType,
        variant: action.payload.variant
      };

    case ProgressActionTypes.PROGRESS_REPORT:
      return {
        ...state,
        kind: action.payload.kind,
        value: action.payload.value,
        title: action.payload.title,
        description: action.payload.description
      };

    case ProgressActionTypes.PROGRESS_COMPLETE:
      return { ...state, init: false, value: 0 };

    case ProgressActionTypes.PROGRESS_ERROR:
      return { ...state, kind: action.payload.kind, error: action.error };

    // TODO
    // case ProgressActionTypes.PROGRESS_BUFFER_REPORT:
    //   return { ...state, valueBuffer: action.payload };

    case ProgressActionTypes.PROGRESS_BUFFER_ERROR:
      return {
        ...state,
        kind: action.payload.kind,
        valueBufferError: action.error
      };

    default:
      return state;
  }
};
