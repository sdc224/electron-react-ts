import { action } from 'typesafe-actions';
import { DrawerActionTypes } from './types';

// eslint-disable-next-line import/prefer-default-export
export const toggleMobileOpen = () =>
  action(DrawerActionTypes.TOGGLE_MOBILE_OPEN);
