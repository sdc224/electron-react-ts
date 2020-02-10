import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 40,
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 38
      }
    },
    shiftContent: {
      paddingLeft: 240
    },
    content: {
      height: '100%'
    }
  });
