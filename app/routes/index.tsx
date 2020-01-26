import React from 'react';
import { Switch, Route } from 'react-router';
import App from '@containers/App';
import routes from './Routes';

export default function Routes() {
  return (
    <App>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.key}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </App>
  );
}
