import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileOpen } from './actions';
import { IDrawerAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useDrawer = () => {
  const drawerState = useSelector((state: IDrawerAwareState) => state.drawer);
  // const { mobileOpen } = drawerState;
  // const mobileOpen = false;
  const dispatch = useDispatch();

  const handleDrawerToggle = useCallback(() => dispatch(toggleMobileOpen()), [
    dispatch
  ]);

  return { drawerState, handleDrawerToggle };
};
