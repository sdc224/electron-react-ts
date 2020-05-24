import { PayloadAction, Action, TypeConstant } from 'typesafe-actions';
import { deleteDuplicateFromArray } from '@utils/arrayHelper';
import { IProjectState, ProjectActionTypes } from './types';
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
    PayloadAction<TypeConstant, RepositoryProjectAndPagination> &
    ErrorAction
): IProjectState => {
  switch (action.type) {
    case ProjectActionTypes.FETCH_ALL_PROJECTS_START:
      return { ...state, loading: true, error: '' };

    case ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        projects: deleteDuplicateFromArray([
          ...state.projects,
          ...action.payload.projects
        ]),
        pagination: { ...state.pagination, ...action.payload.pagination }
      };

    case ProjectActionTypes.FETCH_ALL_PROJECTS_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
