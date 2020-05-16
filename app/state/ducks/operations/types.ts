export const CloneActionTypes = {
  FETCH_CLONABLE_PROJECTS: '@@clone/FETCH_CLONABLE_PROJECTS',
  FETCH_CLONABLE_PROJECTS_SUCCESS: '@@clone/FETCH_CLONABLE_PROJECTS_SUCCESS',
  FETCH_CLONABLE_PROJECTS_ERROR: '@@clone/FETCH_CLONABLE_PROJECTS_ERROR',
  TOGGLE_CLONE_PROGRESS: '@@clone/TOGGLE_CLONE_PROGRESS',
  START_CLONING: '@@clone/START_CLONING'
};

export const ForkActionTypes = {
  FETCH_FORKABLE_PROJECTS: '@@fork/FETCH_FORKABLE_PROJECTS',
  FETCH_FORKABLE_PROJECTS_SUCCESS: '@@fork/FETCH_FORKABLE_PROJECTS_SUCCESS',
  FETCH_FORKABLE_PROJECTS_ERROR: '@@fork/FETCH_FORKABLE_PROJECTS_ERROR',
  TOGGLE_FORK_PROGRESS: '@@fork/TOGGLE_FORK_PROGRESS',
  START_FORKING: '@@clone/START_FORKING'
};

export interface IProject extends Response {
  name: string;
}

export interface IOperationState {
  loading: boolean;
  projects: Array<GitlabProjectSchema>;
  error: string;
  showProgress: boolean;
}

export interface IOperationAwareState {
  clone: IOperationState;
  fork: IOperationState;
}
