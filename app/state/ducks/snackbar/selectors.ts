import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openSnackbar as handleOpenSnackbar,
  closeSnackbar as handleCloseSnackbar
} from './actions';
import { ISnackbarAwareState, ISnackbarState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector(
    (state: ISnackbarAwareState) => state.snackbar
  );
  const openSnackbar = useCallback(
    (actionObj: ISnackbarState) => {
      dispatch(handleOpenSnackbar(actionObj));
    },
    [dispatch]
  );
  const closeSnackbar = useCallback(() => {
    dispatch(handleCloseSnackbar());
  }, [dispatch]);

  return {
    snackbarState,
    openSnackbar,
    closeSnackbar
  };
};
