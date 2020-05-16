import { PayloadAction, Action, TypeConstant } from 'typesafe-actions';
import {
  IProjectState,
  ProjectActionTypes,
  GitlabProjectSchema
} from './types';
import { ErrorAction } from '../ActionHelper';

const initialState: IProjectState = {
  loading: false,
  projects: [],
  error: ''
};

// eslint-disable-next-line import/prefer-default-export
export const projectsReducer = (
  state = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, GitlabProjectSchema[]> &
    ErrorAction
): IProjectState => {
  switch (action.type) {
    case ProjectActionTypes.FETCH_ALL_PROJECTS_START:
      return { ...state, loading: true };

    case ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS:
      return { ...state, loading: false, projects: action.payload };

    case ProjectActionTypes.FETCH_ALL_PROJECTS_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
