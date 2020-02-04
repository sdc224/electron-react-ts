import { RouteProps } from 'react-router';
import HomePage from '@containers/HomePage';
import CounterModel from '@app/containers/CounterModel';
import { Dashboard } from '@views/index';
import jsonRoutes from './jsonRoutes.json';

interface IKey {
  key: string;
}

type RoutePropsWithKey = RouteProps & IKey;

const routes: RoutePropsWithKey[] = [
  {
    key: '1',
    path: jsonRoutes.HOME,
    exact: true,
    component: HomePage
  },
  {
    key: '2',
    path: jsonRoutes.COUNTER,
    exact: true,
    component: CounterModel
  },
  {
    key: '3',
    path: jsonRoutes.DASHBOARD,
    exact: true,
    component: Dashboard
  }
];

export default routes;
