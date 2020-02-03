export const DrawerActionTypes = {
  TOGGLE_MOBILE_OPEN: '@@drawer/TOGGLE_MOBILE_OPEN'
};

export interface IDrawerState {
  mobileOpen: boolean;
}

export interface IDrawerAwareState {
  drawer: IDrawerState;
}
