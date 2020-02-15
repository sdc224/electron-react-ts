import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  AppBarProps,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import GitIcon from '@tsStyles/icons/GitIcon';
import styles from '@componentsCSSStyles/Topbar.css';
import muiStyles from '@componentsTSStyles/topbarStyles';
import WindowButtons from './WindowButtons';

const useStyles = makeStyles(muiStyles);

interface IProps {
  className?: string;
  onSidebarOpen?: () => any;
}

const Topbar = (props: IProps & AppBarProps) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest}>
      <div className={classes.toolbarArea}>
        <Toolbar className={clsx(classes.toolbar, styles.titlebar)}>
          <Hidden lgUp>
            <IconButton
              className={clsx(classes.iconButtons, styles.titlebarButtons)}
              color="inherit"
              onClick={onSidebarOpen}
              disableRipple
              disableFocusRipple
              disableTouchRipple
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <RouterLink to="/">
            <div className={clsx(classes.headerText, styles.titlebarButtons)}>
              <GitIcon iconColor="white" width={24} height={24} />
              <Typography variant="h3" color="inherit">
                Gittian
              </Typography>
            </div>
          </RouterLink>
          <div className={classes.flexGrow} />
          <Hidden mdDown>
            <IconButton
              color="inherit"
              className={clsx(classes.iconButtons, styles.titlebarButtons)}
            >
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={clsx(
                classes.iconButtons,
                classes.signOutButton,
                styles.titlebarButtons
              )}
              color="inherit"
            >
              <InputIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </div>
      {/* Custom Titlebar */}
      <div className={clsx(classes.rightButtons, styles.titlebarButtons)}>
        <WindowButtons />
      </div>
    </AppBar>
  );
};

export default Topbar;
