import { action } from 'typesafe-actions';
import { SnackbarActionTypes } from './types';

export const toggleSuccessSnackbar = (text: string) =>
  action(SnackbarActionTypes.TOGGLE_SUCCESS_SNACKBAR, text);

export const toggleErrorSnackbar = (error: string) =>
  action(SnackbarActionTypes.TOGGLE_ERROR_SNACKBAR, error);
