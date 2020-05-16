import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { ICloneState, CloneActionTypes } from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: ICloneState = {
  loading: false,
  projects: [],
  error: ''
};

// eslint-disable-next-line import/prefer-default-export
export const cloneReducer = (
  state = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, GitlabProjectSchema[]> &
    ErrorAction
): ICloneState => {
  switch (action.type) {
    case CloneActionTypes.FETCH_ALL_PROJECTS:
      return { ...state, loading: true };

    case CloneActionTypes.FETCH_ALL_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.payload };

    case CloneActionTypes.FETCH_ALL_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
