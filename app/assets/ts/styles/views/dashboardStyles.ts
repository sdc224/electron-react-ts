import { createStyles, Theme, StyleRules } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type ClassKey = 'root' | 'main' | 'header' | 'footer' | 'toolbar';

const dashboardStyles = (theme: Theme): StyleRules<ClassKey> =>
  createStyles({
    root: {
      display: 'flex'
    },
    header: {},
    main: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar as CSSProperties,
    footer: {}
  });

export default dashboardStyles;
