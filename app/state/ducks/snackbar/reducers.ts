import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';
import { ISnackbarState, SnackbarActionTypes } from './types';

const initialState: ISnackbarState = {
  openSuccessSnackbar: false,
  snackbarSuccessText: '',
  openErrorSnackbar: false,
  snackbarErrorText: ''
};

// eslint-disable-next-line import/prefer-default-export
export const snackbarReducer = (
  state = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, string>
): ISnackbarState => {
  switch (action.type) {
    case SnackbarActionTypes.TOGGLE_SUCCESS_SNACKBAR:
      return {
        ...state,
        openSuccessSnackbar: !state.openSuccessSnackbar,
        snackbarSuccessText: action.payload
      };

    case SnackbarActionTypes.TOGGLE_ERROR_SNACKBAR:
      return {
        ...state,
        openErrorSnackbar: !state.openErrorSnackbar,
        snackbarErrorText: action.payload
      };

    default:
      return state;
  }
};
