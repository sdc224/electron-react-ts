import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    iconButtons: {
      paddingTop: 6,
      paddingBottom: 6,
      borderRadius: 0
    },
    signOutButton: {
      marginLeft: theme.spacing(1)
    }
  });
