import { createStyles, Theme } from '@material-ui/core';

const dashboardStyles = (theme: Theme) =>
  createStyles({
    root: {},
    appbar: {
      // As top AppBar has 38px height
      top: 38,
      right: 'auto',
      background: '#FBF2D4',
      height: 48,
      display: 'flex',
      alignItems: 'center'
    },
    header: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '0px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    main: {
      boxSizing: 'border-box',
      marginTop: theme.spacing(6),
      overflowY: 'auto',
      overflowX: 'hidden',
      // TODO : Set with clientWidth
      height: 490
    }
  });

export default dashboardStyles;
