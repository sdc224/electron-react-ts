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
  Theme,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import GitIcon from '@tsStyles/icons/GitIcon';
import styles from '@css/components/Topbar.css';
import WindowButtons from './WindowButtons';

const useStyles = makeStyles((theme: Theme) => ({
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  widthAdder: {
    width: theme.spacing(2)
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '8rem',
    paddingLeft: '12px',
    paddingRight: '12px'
  },
  rightButtons: {
    display: 'flex',
    right: 0
  },
  iconButtons: {
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 0
  },
  toolbar: {
    width: '100%',
    minHeight: 'auto',
    padding: 0
  }
}));

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
      <div style={{ padding: 1 }}>
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
              className={clsx(styles.titlebarButtons)}
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
              className={clsx(classes.signOutButton, styles.titlebarButtons)}
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
