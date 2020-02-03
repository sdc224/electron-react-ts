import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from '@tsStyles/styles/components/sideDrawerStyles';
import { IDrawerState } from '@ducks/drawer/types';
import AsideDrawer from './AsideDrawer';

const useStyles = makeStyles(styles);

interface IProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => any;
}

export default function SideDrawer({
  mobileOpen,
  handleDrawerToggle
}: IProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

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
