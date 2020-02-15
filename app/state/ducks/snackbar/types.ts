export const SnackbarActionTypes = {
  TOGGLE_SUCCESS_SNACKBAR: '@@snackbar/TOGGLE_SUCCESS_SNACKBAR',
  TOGGLE_ERROR_SNACKBAR: '@@snackbar/TOGGLE_ERROR_SNACKBAR'
};

export interface ISnackbarState {
  openSuccessSnackbar: boolean;
  snackbarSuccessText: string;
  openErrorSnackbar: boolean;
  snackbarErrorText: string;
}

export interface ISnackbarAwareState {
  snackbar: ISnackbarState;
}
