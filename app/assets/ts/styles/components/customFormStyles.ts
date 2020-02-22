import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    headerText: {
      marginBottom: theme.spacing(1)
    },
    main: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400
    },
    formButton: {
      width: 150,
      alignSelf: 'flex-end',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  });
