import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minWidth: 275,
      minHeight: 180
    },
    cardHeaderTitle: {
      fontSize: 14,
      color: theme.palette.black,
      opacity: 0.87
    },
    cardContent: {
      flexGrow: 1
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });
