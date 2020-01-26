import { action } from 'typesafe-actions';
import { DrawerActionTypes } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setMobileOpen = (mobileOpen: boolean) =>
  action(DrawerActionTypes.SET_MOBILE_OPEN, mobileOpen);
