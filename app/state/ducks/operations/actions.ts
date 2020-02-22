import { action } from 'typesafe-actions';
import { ProjectSchema } from 'gitlab';
import { CloneActionTypes, ForkActionTypes } from './types';
import { IProgressBarSelector } from '../progress/types';

export const fetchClonableProjects = () =>
  action(CloneActionTypes.FETCH_CLONABLE_PROJECTS);

export const fetchClonableProjectsSuccess = (data: ProjectSchema[]) =>
  action(CloneActionTypes.FETCH_CLONABLE_PROJECTS_SUCCESS, data);

export const fetchClonableProjectsError = (message: string) =>
  action(
    CloneActionTypes.FETCH_CLONABLE_PROJECTS_ERROR,
    undefined,
    undefined,
    message
  );

export const toggleCloneProgress = () =>
  action(CloneActionTypes.TOGGLE_CLONE_PROGRESS);

export const startCloning = (
  projects: ProjectSchema[],
  progressState: IProgressBarSelector
) => action(CloneActionTypes.START_CLONING, { projects, progressState });

export const fetchForkableProjects = () =>
  action(ForkActionTypes.FETCH_FORKABLE_PROJECTS);

export const fetchForkableProjectsSuccess = (data: ProjectSchema[]) =>
  action(ForkActionTypes.FETCH_FORKABLE_PROJECTS_SUCCESS, data);

export const fetchForkableProjectsError = (message: string) =>
  action(
    ForkActionTypes.FETCH_FORKABLE_PROJECTS_ERROR,
    undefined,
    undefined,
    message
  );

export const toggleForkProgress = () =>
  action(ForkActionTypes.TOGGLE_FORK_PROGRESS);

export const startForking = (
  projects: ProjectSchema[],
  progressState: IProgressBarSelector
) => action(ForkActionTypes.START_FORKING, { projects, progressState });
