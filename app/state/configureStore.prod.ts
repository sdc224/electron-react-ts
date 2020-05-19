import { createStore, applyMiddleware, Store } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { IApplicationState, createRootReducer, rootSaga } from './ducks';
import sagaMiddleware from './middlewares/sagas';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);

function configureStore(
  initialState?: IApplicationState
): Store<IApplicationState> {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default { configureStore, history };
