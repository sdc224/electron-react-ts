import { combineReducers } from 'redux';
import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { postReducer } from './post/reducers';
import postSaga from './post/sagas';
import { IPostState } from './post/types';
import { counterReducer } from './counter/reducers';
import { ICloneState } from './clone/types';
import { cloneReducer } from './clone/reducers';
import cloneSaga from './clone/sagas';
import { IProgressBarState } from './progress/types';
import { progressReducer } from './progress/reducers';
import { ISnackbarState } from './snackbar/types';
import { snackbarReducer } from './snackbar/reducers';

// The top-level state object
export interface IApplicationState {
  post: IPostState;
  counter: number;
  clone: ICloneState;
  router: RouterState;
  progress: IProgressBarState;
  snackbar: ISnackbarState;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    post: postReducer,
    counter: counterReducer,
    clone: cloneReducer,
    progress: progressReducer,
    snackbar: snackbarReducer,
    router: connectRouter(history)
  });

export function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(postSaga), fork(cloneSaga)]);
}
