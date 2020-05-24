import { PaginationOptions } from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';

export const ProjectActionTypes = {
  FETCH_ALL_PROJECTS_START: '@@projects/FETCH_ALL_PROJECTS_START',
  FETCH_ALL_PROJECT_SUCCESS: '@@projects/FETCH_ALL_PROJECT_SUCCESS',
  FETCH_ALL_PROJECTS_FAIL: '@@projects/FETCH_ALL_PROJECTS_FAIL'
};

export interface IProjectState {
  loading: boolean;
  projects: IRepository[];
  error: string;
  pagination?: PaginationOptions;
}

export interface IProjectAwareState {
  projects: IProjectState;
}
