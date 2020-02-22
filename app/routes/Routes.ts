import { RouteProps } from 'react-router';
// import HomePage from '@containers/HomePage';
// import CounterModel from '@containers/CounterModel';
import Main from '@layouts/Main';
import { Dashboard, Operations } from '@views/';
import jsonRoutes from './jsonRoutes.json';

interface IRouteWithLayout {
  key: string;
  layout: React.FC;
}

type RoutePropsWithLayout = RouteProps & IRouteWithLayout;

const routes: RoutePropsWithLayout[] = [
  {
    key: '1',
    path: jsonRoutes.DASHBOARD,
    exact: true,
    // component: HomePage,
    component: Dashboard,
    layout: Main
  },
  {
    key: '2',
    path: jsonRoutes.OPERATIONS,
    exact: true,
    component: Operations,
    layout: Main
  }
];

export default routes;
