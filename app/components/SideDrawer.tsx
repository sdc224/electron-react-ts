import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '@state/ducks';
import { setMobileOpen } from '@state/ducks/drawer/action';
import AsideDrawer from './AsideDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

export default function SideDrawer(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const mobileOpen = useSelector<IApplicationState, boolean>(
    (state: IApplicationState) => state.drawer.mobileOpen
  );
  const dispatch = useDispatch();

  // const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);
  const handleDrawerToggle = () => dispatch(setMobileOpen(!mobileOpen));

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <AsideDrawer />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <AsideDrawer />
        </Drawer>
      </Hidden>
    </nav>
  );
}
