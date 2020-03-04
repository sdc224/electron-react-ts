import React from 'react';
import { Switch, Redirect } from 'react-router';
import App from '@containers/App';
import RouteWithLayout from '@components/RouteWithLayout';
import CustomSnackbar from '@components/CustomSnackbar';
import routes from './Routes';

export default function Routes() {
  return (
    <App>
      <CustomSnackbar />
      <Switch>
        <Redirect exact from="/" to="/welcomde" />
        {routes.map(route => (
          <RouteWithLayout
            key={route.key}
            exact={route.exact}
            path={route.path}
            component={route.component}
            layout={route.layout}
          />
        ))}
        <Redirect to="/not-found" />
      </Switch>
    </App>
  );
}
