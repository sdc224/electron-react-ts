import React from 'react';
import { Switch } from 'react-router';
import App from '@containers/App';
import RouteWithLayout from '@components/RouteWithLayout';
import routes from './Routes';

export default function Routes() {
  return (
    <App>
      <Switch>
        {routes.map(route => (
          <RouteWithLayout
            key={route.key}
            exact={route.exact}
            path={route.path}
            component={route.component}
            layout={route.layout}
          />
        ))}
      </Switch>
    </App>
  );
}
