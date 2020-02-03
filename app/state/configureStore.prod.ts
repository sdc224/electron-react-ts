import { createStore, applyMiddleware, Store } from 'redux';
import { createStore as createStoreDynamic } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { IApplicationState, createRootReducer, rootSaga } from './ducks';
import sagaMiddleware from './middlewares/sagas';
import { routerModule } from './ducks/history/module';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);
const extensions = [getSagaExtension()];

const configureStore = (initialState?: IApplicationState) => {
  return createStoreDynamic(
    {
      initialState,
      extensions
    },
    routerModule
  );
};

export default { configureStore, history };
