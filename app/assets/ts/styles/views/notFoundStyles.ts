import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      width: '100%',
      padding: theme.spacing(4),
      height: '100%'
    },
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    contentHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    image: {
      marginTop: 50,
      display: 'inline-block',
      maxWidth: '100%',
      width: 560
    }
  });
