import { RouteProps } from 'react-router';
import Main from '@layouts/Main';
import Minimal from '@layouts/Minimal/';
import { Welcome, Dashboard, Operations, NotFound } from '@views/';
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
    component: Dashboard,
    layout: Main
  },
  {
    key: '2',
    path: jsonRoutes.OPERATIONS,
    exact: true,
    component: Operations,
    layout: Main
  },
  {
    key: '3',
    path: jsonRoutes.WELCOME,
    exact: true,
    component: Welcome,
    layout: Minimal
  },
  {
    key: '99',
    path: jsonRoutes.NOTFOUND,
    exact: true,
    component: NotFound,
    layout: Minimal
  }
];

export default routes;
