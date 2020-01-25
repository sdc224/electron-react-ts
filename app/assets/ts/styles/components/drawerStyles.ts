import { createStyles, Theme, StyleRules } from '@material-ui/core';

type ClassKey = 'toolbar';

export default (theme: Theme): StyleRules<ClassKey> =>
  createStyles({
    toolbar: theme.mixins.toolbar
  });
