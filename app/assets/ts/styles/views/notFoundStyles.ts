import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      height: '100%'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    image: {
      marginTop: 50,
      display: 'inline-block',
      maxWidth: '100%',
      width: 560
    }
  });
