import { ProjectSchema } from 'gitlab';
import { action } from 'typesafe-actions';
import { ProjectActionTypes } from './types';

export const getAllProjectsStart = () =>
  action(ProjectActionTypes.FETCH_ALL_PROJECTS_START);

export const getAllProjectsSuccess = (projects: ProjectSchema[]) =>
  action(ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS, projects);

export const getAllProjectsError = (error: string) =>
  action(
    ProjectActionTypes.FETCH_ALL_PROJECTS_FAIL,
    undefined,
    undefined,
    error
  );
