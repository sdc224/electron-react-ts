import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1
    },
    widthAdder: {
      width: theme.spacing(2)
    },
    headerText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '8rem',
      paddingLeft: '12px',
      paddingRight: '12px'
    },
    rightButtons: {
      display: 'flex',
      right: 0
    },
    iconButtons: {
      paddingTop: 6,
      paddingBottom: 6,
      borderRadius: 0
    },
    toolbar: {
      width: '100%',
      height: '100%',
      minHeight: 'auto',
      padding: 0
    },
    toolbarArea: {
      padding: 1,
      width: '100%'
    }
  });
