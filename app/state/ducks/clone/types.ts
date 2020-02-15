import { ProjectSchema } from 'gitlab';

export const CloneActionTypes = {
  FETCH_ALL_PROJECTS: '@@clone/FETCH_ALL_PROJECTS',
  FETCH_ALL_PROJECTS_SUCCESS: '@@clone/FETCH_ALL_PROJECTS_SUCCESS',
  FETCH_ALL_PROJECTS_ERROR: '@@clone/FETCH_ALL_PROJECTS_ERROR',
  TOGGLE_CLONE_PROGRESS: '@@clone/TOGGLE_CLONE_PROGRESS'
};

export interface IProject extends Response {
  name: string;
}

export interface ICloneState {
  loading: boolean;
  projects: Array<ProjectSchema>;
  error: string;
  showProgress: boolean;
}

export interface ICloneAwareState {
  clone: ICloneState;
}
