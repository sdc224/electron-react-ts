import { action } from 'typesafe-actions';
import { SnackbarActionTypes, ISnackbarState } from './types';

export const openSnackbar = (actionObj: ISnackbarState) =>
  action(SnackbarActionTypes.OPEN_SNACKBAR, actionObj);

export const closeSnackbar = () => action(SnackbarActionTypes.CLOSE_SNACKBAR);
