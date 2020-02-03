import React from 'react';
import { Provider } from 'react-redux';
import { IModuleStore, DynamicModuleLoader } from 'redux-dynamic-modules';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { IApplicationState } from '@ducks/index';
import Routes from '@routes/';
import { routerModule } from '@ducks/history/module';

type Props = {
  // store: Store<IApplicationState>;
  store: IModuleStore<IApplicationState>;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <DynamicModuleLoader modules={[routerModule]}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </DynamicModuleLoader>
  </Provider>
);

export default hot(Root);
