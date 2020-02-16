export const SnackbarActionTypes = {
  OPEN_SNACKBAR: '@@snackbar/OPEN_SNACKBAR',
  CLOSE_SNACKBAR: '@@snackbar/CLOSE_SNACKBAR'
};

export interface ISnackbarState {
  kind?: string;
  text?: string;
  variant?: 'error' | 'warning' | 'info' | 'success';
}

export interface ISnackbarAwareState {
  snackbar: ISnackbarState;
}
