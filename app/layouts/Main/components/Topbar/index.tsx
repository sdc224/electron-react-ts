import React from 'react';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import { deletePassword } from 'keytar';
import Topbar from '@components/Topbar';
import {
  Hidden,
  IconButton,
  makeStyles,
  Badge,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SignOutIcon from '@material-ui/icons/PowerSettingsNew';
import styles from '@layoutsCSSStyles/TopbarMain.css';
import muiStyles from '@layoutsTSStyles/mainTopbarStyles';
import { useConfirmation } from '@containers/ConfirmationService';
import { KeytarService, KeytarAccount } from '@constants/securityConstants';

interface ITopbarMainProps {
  onSidebarOpen?(): void;
}

const useStyles = makeStyles(muiStyles);

const TopbarMain: React.FC<ITopbarMainProps> = ({
  onSidebarOpen
}: ITopbarMainProps) => {
  const classes = useStyles();
  const history = useHistory();

  const [notifications] = React.useState([]);

  const confirm = useConfirmation();

  const signOut = async () => {
    await confirm({
      id: 'signout',
      variant: 'danger',
      title: 'Are you sure you want to sign out?',
      description: 'If you sign out you need to sign in again'
    });

    const success = await deletePassword(KeytarService, KeytarAccount);
    if (success) history.push('sign-in');
  };

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
        <Hidden xsDown>
          <Tooltip title="Notifications">
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
          </Tooltip>
          <Tooltip title="Sign Out">
            <IconButton
              className={clsx(
                classes.iconButtons,
                classes.signOutButton,
                styles.titlebarButtons
              )}
              color="inherit"
              onClick={signOut}
            >
              <SignOutIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
      }
    />
  );
};

export default TopbarMain;
