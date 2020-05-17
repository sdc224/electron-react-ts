import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { IOperationState, CloneActionTypes, ForkActionTypes } from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: IOperationState = {
  loading: false,
  projects: [],
  error: '',
  showProgress: false
};

export const cloneReducer = (
  state = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, IRepository[]> &
    ErrorAction
): IOperationState => {
  switch (action.type) {
    case CloneActionTypes.FETCH_CLONABLE_PROJECTS:
      return { ...state, loading: true };

    case CloneActionTypes.FETCH_CLONABLE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        projects: action.payload as IRepository[]
      };

    case CloneActionTypes.FETCH_CLONABLE_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.error };

    case CloneActionTypes.TOGGLE_CLONE_PROGRESS:
      return { ...state, showProgress: !state.showProgress };

    default:
      return state;
  }
};

export const forkReducer = (
  state = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, IRepository[]> &
    ErrorAction
): IOperationState => {
  switch (action.type) {
    case ForkActionTypes.FETCH_FORKABLE_PROJECTS:
      return { ...state, loading: true };

    case ForkActionTypes.FETCH_FORKABLE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        projects: action.payload as IRepository[]
      };

    case ForkActionTypes.FETCH_FORKABLE_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.error };

    case ForkActionTypes.TOGGLE_FORK_PROGRESS:
      return { ...state, showProgress: !state.showProgress };

    default:
      return state;
  }
};
