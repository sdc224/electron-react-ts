import { Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export default (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar as CSSProperties
  });
