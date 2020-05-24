import { action } from 'typesafe-actions';
import {
  PaginatedRequestOptions,
  PaginationOptions
} from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';

import { ProjectActionTypes } from './types';

export const getAllProjectsStart = (
  paginatedRequestOption: PaginatedRequestOptions
) =>
  action(ProjectActionTypes.FETCH_ALL_PROJECTS_START, paginatedRequestOption);

export const getAllProjectsSuccess = (
  projects: IRepository[],
  pagination: PaginationOptions
) =>
  action(ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS, {
    projects,
    pagination
  });

export const getAllProjectsError = (error: string) =>
  action(
    ProjectActionTypes.FETCH_ALL_PROJECTS_FAIL,
    undefined,
    undefined,
    error
  );
