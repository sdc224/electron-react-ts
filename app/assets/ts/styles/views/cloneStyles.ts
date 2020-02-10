import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    }
  });
