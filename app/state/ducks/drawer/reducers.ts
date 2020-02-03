import { Action } from 'redux';
import { IDrawerState, DrawerActionTypes } from './types';

const initialState: IDrawerState = {
  mobileOpen: false
};

// eslint-disable-next-line import/prefer-default-export
export const drawerReducer = (
  state: IDrawerState = initialState,
  action: Action<string>
): IDrawerState => {
  switch (action.type) {
    case DrawerActionTypes.TOGGLE_MOBILE_OPEN:
      return { ...state, mobileOpen: !state.mobileOpen };

    default:
      return state;
  }
};
