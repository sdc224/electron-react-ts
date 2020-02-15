import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuccessSnackbar, toggleErrorSnackbar } from './actions';
import { ISnackbarAwareState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector(
    (state: ISnackbarAwareState) => state.snackbar
  );
  const handleSuccessSnackbar = useCallback(
    (text: string) => {
      dispatch(toggleSuccessSnackbar(text));
    },
    [dispatch]
  );
  const handleErrorSnackbar = useCallback(
    (text: string) => {
      dispatch(toggleErrorSnackbar(text));
    },
    [dispatch]
  );

  return {
    snackbarState,
    handleSuccessSnackbar,
    handleErrorSnackbar
  };
};
