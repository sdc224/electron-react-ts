import { Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const welcomeStyles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar as CSSProperties
  });

export default welcomeStyles;
