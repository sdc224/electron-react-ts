import { createStyles, Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative'
    },
    button: {
      width: '100%'
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    },
    linearProgress: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0.4,
      borderRadius: 4
    }
  });
