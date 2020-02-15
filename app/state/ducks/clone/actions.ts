import { action } from 'typesafe-actions';
import { ProjectSchema } from 'gitlab';
import { CloneActionTypes } from './types';

export const fetchAllProjects = () =>
  action(CloneActionTypes.FETCH_ALL_PROJECTS);

export const fetchAllProjectsSuccess = (data: ProjectSchema[]) =>
  action(CloneActionTypes.FETCH_ALL_PROJECTS_SUCCESS, data);

export const fetchAllProjectsError = (message: string) =>
  action(
    CloneActionTypes.FETCH_ALL_PROJECTS_ERROR,
    undefined,
    undefined,
    message
  );

export const toggleCloneProgress = () =>
  action(CloneActionTypes.TOGGLE_CLONE_PROGRESS);
