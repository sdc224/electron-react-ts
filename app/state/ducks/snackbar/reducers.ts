import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { ISnackbarState, SnackbarActionTypes } from './types';

const initialState: ISnackbarState = {
  kind: undefined,
  text: undefined,
  variant: undefined
};

// eslint-disable-next-line import/prefer-default-export
export const snackbarReducer = (
  state = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, ISnackbarState>
): ISnackbarState => {
  switch (action.type) {
    case SnackbarActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        kind: action.payload.kind,
        text: action.payload.text,
        variant: action.payload.variant
      };

    case SnackbarActionTypes.CLOSE_SNACKBAR:
      // Not mutating the previous state
      return { ...initialState };

    default:
      return state;
  }
};
