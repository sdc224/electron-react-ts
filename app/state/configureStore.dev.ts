/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, createStore, Store, compose } from 'redux';
import { createStore as createStoreDynamic } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { IApplicationState, createRootReducer, rootSaga } from './ducks';
import sagaMiddleware from './middlewares/sagas';
import * as counterActions from './ducks/counter/actions';
import { routerModule } from './ducks/history/module';
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

const configureStore2 = (preloadedState = {}) => {
  return createStoreDynamic(
    {
      initialState: preloadedState,
      enhancers: [
        applyMiddleware(
          createLogger({
            level: 'info',
            collapsed: true
          })
        )
      ],
      extensions: [getSagaExtension()]
    },
    routerModule
  );
};

const configureStore = (initialState?: IApplicationState) => {
  const middlewares = [];
  const enhancers = [];
  const extensions = [];

  // Saga Extension
  extensions.push(getSagaExtension());

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middlewares.push(logger);
  }

  // We don't need Redux Devtools Extension, as redux-dynamic-modules
  // comes with the extension by default
  // Although there is an issue regarding the configuration of Redux
  // Devtools, so if it is needed later, here is the link
  // https://github.com/microsoft/redux-dynamic-modules/issues/65

  // // Redux DevTools Configuration
  // // const actionCreators = {
  // //   ...counterActions,
  // //   ...routerActions
  // // };

  // // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  // /* eslint-disable no-underscore-dangle */
  // // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // //   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // //       // Options: http://extension.remotedev.io/docs/API/Arguments.html
  // //       actionCreators
  // //     })
  // //   : compose;
  // /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middlewares));

  // Create Store
  const store = createStoreDynamic(
    {
      initialState,
      enhancers,
      extensions
    },
    routerModule
  );

  if (module.hot) {
    module.hot.accept(
      './ducks',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./ducks').default)
    );
  }

  return store;
};

export default { configureStore, history };
