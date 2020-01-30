import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from '@assets/ts/styles/components/sideDrawerStyles';
import { IApplicationState } from '@state/ducks';
import { setMobileOpen } from '@state/ducks/drawer/action';
import AsideDrawer from './AsideDrawer';

const useStyles = makeStyles(styles);

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
