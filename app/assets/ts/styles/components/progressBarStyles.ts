import { Theme, createStyles, lighten } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    div: {},
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
      borderRadius: 20
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c'
    },
    progressBar: {
      margin: theme.spacing(1)
    }
  });
