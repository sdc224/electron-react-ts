import { combineReducers } from 'redux';
import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { postReducer } from './post/reducers';
import postSaga from './post/sagas';
import { IPostState } from './post/types';
import { IDrawerState } from './drawer/types';
import { drawerReducer } from './drawer/reducers';
import { counterReducer } from './counter/reducers';
import { IOperationState } from './operation/types';
import { operationReducer } from './operation/reducers';

// The top-level state object
export interface IApplicationState {
  post: IPostState;
  drawer: IDrawerState;
  counter: number;
  operation: IOperationState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    post: postReducer,
    drawer: drawerReducer,
    counter: counterReducer,
    operation: operationReducer,
    router: connectRouter(history)
  });

export function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(postSaga)]);
}
