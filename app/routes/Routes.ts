import { RouteProps } from 'react-router';
// import HomePage from '@containers/HomePage';
import CounterModel from '@containers/CounterModel';
import Main from '@layouts/Main';
import { Dashboard } from '@views/';
import jsonRoutes from './jsonRoutes.json';

interface IRouteWithLayout {
  key: string;
  layout: React.FC;
}

type RoutePropsWithLayout = RouteProps & IRouteWithLayout;

const routes: RoutePropsWithLayout[] = [
  {
    key: '1',
    path: jsonRoutes.HOME,
    exact: true,
    // component: HomePage,
    component: Dashboard,
    layout: Main
  },
  {
    key: '2',
    path: jsonRoutes.COUNTER,
    exact: true,
    component: CounterModel,
    layout: Main
  },
  {
    key: '3',
    path: jsonRoutes.DASHBOARD,
    exact: true,
    component: Dashboard,
    layout: Main
  }
];

export default routes;
