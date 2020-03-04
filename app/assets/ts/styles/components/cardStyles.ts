import { createStyles } from '@material-ui/core';

export default () =>
  createStyles({
    root: {
      minWidth: 275,
      minHeight: 180
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
