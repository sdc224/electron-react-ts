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

export const ForkUpdateActionTypes = {
  TOGGLE_FORK_UPDATE_PROGRESS: '@@forkUpdate/TOGGLE_FORK_UPDATE_PROGRESS',
  START_FORK_UPDATING: '@@forkUpdate/START_FORK_UPDATING'
};

export interface IProject extends Response {
  name: string;
}

interface IShowProgressState {
  showProgress: boolean;
}

export interface IOperationState extends IShowProgressState {
  loading: boolean;
  projects: Array<IRepository>;
  error: string;
}

export interface IOperationAwareState {
  clone: IOperationState;
  fork: IOperationState;
}
