import { createStyles, Theme, StyleRules } from '@material-ui/core';

type ClassKey = 'root' | 'main' | 'header' | 'footer';

const dashboardStyles = (theme: Theme): StyleRules<ClassKey> =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    header: {},
    main: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    footer: {}
  });

export default dashboardStyles;
