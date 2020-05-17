import React from 'react';
import clsx from 'clsx';
import Topbar from '@components/Topbar';
import { Hidden, IconButton, makeStyles, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import styles from '@layoutsCSSStyles/TopbarMain.css';
import muiStyles from '@layoutsTSStyles/mainTopbarStyles';

interface ITopbarMainProps {
  onSidebarOpen?(): void;
}

const useStyles = makeStyles(muiStyles);

const TopbarMain: React.FC<ITopbarMainProps> = ({
  onSidebarOpen
}: ITopbarMainProps) => {
  const classes = useStyles();

  const [notifications] = React.useState([]);

  return (
    <Topbar
      onSidebarOpen={onSidebarOpen}
      leftSection={
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
      }
      rightSection={
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
      }
    />
  );
};

export default TopbarMain;
