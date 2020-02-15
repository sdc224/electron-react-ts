import { ProjectSchema } from 'gitlab';
import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { ICloneState, CloneActionTypes } from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: ICloneState = {
  loading: false,
  projects: [],
  error: '',
  showProgress: false
};

// eslint-disable-next-line import/prefer-default-export
export const cloneReducer = (
  state = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, ProjectSchema[]> &
    ErrorAction
): ICloneState => {
  switch (action.type) {
    case CloneActionTypes.FETCH_ALL_PROJECTS:
      return { ...state, loading: true };

    case CloneActionTypes.FETCH_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload as ProjectSchema[]
      };

    case CloneActionTypes.FETCH_ALL_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.error };

    case CloneActionTypes.TOGGLE_CLONE_PROGRESS:
      return { ...state, showProgress: !state.showProgress };

    default:
      return state;
  }
};
