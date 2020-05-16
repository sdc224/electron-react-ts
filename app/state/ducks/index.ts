import { combineReducers } from 'redux';
import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { postReducer } from './post/reducers';
import postSaga from './post/sagas';
import { IPostState } from './post/types';
import { counterReducer } from './counter/reducers';
import { IOperationState } from './operations/types';
import { cloneReducer, forkReducer } from './operations/reducers';
import operationsSaga from './operations/sagas';
import { IProgressBarState } from './progress/types';
import { progressReducer } from './progress/reducers';
import { ISnackbarState } from './snackbar/types';
import { snackbarReducer } from './snackbar/reducers';
import { IProjectState } from './projects/types';
import { projectsReducer } from './projects/reducers';
import projectsSaga from './projects/sagas';
import { ISettingsState } from './settings/types';
import { settingsReducer } from './settings/reducers';

// The top-level state object
export interface IApplicationState {
  post: IPostState;
  counter: number;
  clone: IOperationState;
  fork: IOperationState;
  router: RouterState;
  progress: IProgressBarState;
  snackbar: ISnackbarState;
  projects: IProjectState;
  settings: ISettingsState;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    post: postReducer,
    counter: counterReducer,
    clone: cloneReducer,
    fork: forkReducer,
    progress: progressReducer,
    snackbar: snackbarReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    router: connectRouter(history)
  });

export function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(postSaga), fork(operationsSaga), fork(projectsSaga)]);
}
