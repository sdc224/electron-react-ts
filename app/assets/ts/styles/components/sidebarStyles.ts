import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      [theme.breakpoints.up('lg')]: {
        marginTop: 38,
        height: 'calc(100% - 38px)'
      }
    },
    root: {
      backgroundColor: theme.palette.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2)
    },
    divider: {
      margin: theme.spacing(2, 0)
    },
    nav: {
      marginBottom: theme.spacing(2)
    }
  });
