import { action } from 'typesafe-actions';
import { IForkUpdateOptions } from '@commands/models/forkUpdate';
import {
  CloneActionTypes,
  ForkActionTypes,
  ForkUpdateActionTypes
} from './types';
import { IProgressBarSelector } from '../progress/types';

export const fetchClonableProjects = () =>
  action(CloneActionTypes.FETCH_CLONABLE_PROJECTS);

export const fetchClonableProjectsSuccess = (data: IRepository[]) =>
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
  projects: IRepository[],
  progressState: IProgressBarSelector
) => action(CloneActionTypes.START_CLONING, { projects, progressState });

export const fetchForkableProjects = () =>
  action(ForkActionTypes.FETCH_FORKABLE_PROJECTS);

export const fetchForkableProjectsSuccess = (data: IRepository[]) =>
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
  projects: IRepository[],
  progressState: IProgressBarSelector
) => action(ForkActionTypes.START_FORKING, { projects, progressState });

export const toggleForkUpdateProgress = () =>
  action(ForkUpdateActionTypes.TOGGLE_FORK_UPDATE_PROGRESS);

export const startForkUpdating = (
  projects: IRepository[],
  options: IForkUpdateOptions,
  progressState: IProgressBarSelector
) =>
  action(ForkUpdateActionTypes.START_FORK_UPDATING, {
    projects,
    options,
    progressState
  });
