import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { IDrawerState, DrawerActionTypes } from './types';

const initialState: IDrawerState = {
  mobileOpen: false
};

// eslint-disable-next-line import/prefer-default-export
export const drawerReducer = (
  state: IDrawerState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, boolean>
): IDrawerState => {
  switch (action.type) {
    case DrawerActionTypes.SET_MOBILE_OPEN:
      return { ...state, mobileOpen: action.payload };

    default:
      return state;
  }
};
