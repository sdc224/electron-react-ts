import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { IModuleStore } from 'redux-dynamic-modules';
import { configureStore, history } from '@state/configureStore';
import { IApplicationState } from '@state/ducks';
import Root from '@containers/Root';
import './app.global.css';

// const store = configureStore();
const store = configureStore() as IModuleStore<IApplicationState>;

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
