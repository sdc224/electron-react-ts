import { action } from 'typesafe-actions';
import { ProjectActionTypes, GitlabProjectSchema } from './types';

export const getAllProjectsStart = () =>
  action(ProjectActionTypes.FETCH_ALL_PROJECTS_START);

export const getAllProjectsSuccess = (projects: GitlabProjectSchema[]) =>
  action(ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS, projects);

export const getAllProjectsError = (error: string) =>
  action(
    ProjectActionTypes.FETCH_ALL_PROJECTS_FAIL,
    undefined,
    undefined,
    error
  );
