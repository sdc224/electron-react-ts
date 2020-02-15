/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, createStore, Store, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { IApplicationState, createRootReducer, rootSaga } from './ducks';
import sagaMiddleware from './middlewares/sagas';
import * as counterActions from './ducks/counter/actions';
import * as cloneActions from './ducks/clone/actions';
import * as snackbarActions from './ducks/snackbar/actions';
// import * as postActions from './ducks/post/actions';
// import * as drawerActions from './ducks/drawer/action';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
      obj: Record<string, any>
    ) => Function;
  }
  interface NodeModule {
    hot?: {
      accept: (path: string, cb: () => void) => void;
    };
  }
}

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = (
  initialState?: IApplicationState
): Store<IApplicationState> => {
  const middlewares = [];
  const enhancers = [];

  // Saga Middleware
  middlewares.push(sagaMiddleware);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    // Removing progress from logger
    predicate: (_getState, action) => !action.type.includes('@@progress')
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middlewares.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middlewares.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions,
    ...cloneActions,
    ...snackbarActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middlewares));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      './ducks',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./ducks').default)
    );
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default { configureStore, history };
