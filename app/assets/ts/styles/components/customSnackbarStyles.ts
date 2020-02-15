import { createStyles, Theme } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';

export const snackbarContentStyles = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentRoot: {
      flexWrap: 'nowrap'
    }
  });

export const snackbarStyles = (theme: Theme) =>
  createStyles({
    snackbarRoot: {
      maxWidth: 400,
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    },
    margin: {
      margin: theme.spacing(1)
    }
  });
