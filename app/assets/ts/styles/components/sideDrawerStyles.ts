import { Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { DRAWER_WIDTH } from '@constants/styleConstants';
import gitlabImage from '@images/gitlab-img.png';

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar as CSSProperties,
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: '#737881',
      color: 'rgba(255, 255, 255, 0.8)',
      '&:after': {
        content: `''`,
        background: `url(${gitlabImage}) center no-repeat`,
        backgroundSize: '100%',
        opacity: 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1
      } as CSSProperties
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  });
