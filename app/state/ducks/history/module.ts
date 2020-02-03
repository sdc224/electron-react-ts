import { IModule } from 'redux-dynamic-modules';
import { LocationState, createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

// eslint-disable-next-line import/prefer-default-export
export const routerModule: IModule<LocationState> = {
  id: 'router',
  reducerMap: {
    router: connectRouter(history)
  },
  middlewares: [routerMiddleware(history)]
};
