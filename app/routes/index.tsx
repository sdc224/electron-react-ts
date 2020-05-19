import React from 'react';
import { Switch, Redirect } from 'react-router';
import App from '@containers/App';
import RouteWithLayout from '@components/RouteWithLayout';
import CustomSnackbar from '@components/CustomSnackbar';
import { Organizations } from '@commands/models/organization';
import credentials from '@private/credentials';
import routes from './Routes';

const Routes: React.FC = () => {
  const [path, setPath] = React.useState('/');

  const fetchCredential = React.useCallback(
    () => credentials(Organizations.HighRadius),
    []
  );

  React.useEffect(() => {
    const creds = fetchCredential();
    if (creds) setPath('/dashboard');
    else setPath('/sign-in');
  });

  return (
    <App>
      <CustomSnackbar />
      <Switch>
        <Redirect exact from="/" to={path} />
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
};

export default Routes;
