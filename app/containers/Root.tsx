import React, { Suspense } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { IApplicationState } from '@ducks/index';
import Loading from '@components/Loading';
import { ThemeProvider } from '@material-ui/core';
import theme from '@theme/';
import { ConfirmationServiceProvider } from './ConfirmationService';

const Routes = React.lazy(() => import('@routes/'));

type Props = {
  store: Store<IApplicationState>;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <ConfirmationServiceProvider>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </ConfirmationServiceProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
