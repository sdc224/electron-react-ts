/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloneIcon from '@material-ui/icons/FileCopy';
import WorkIcon from '@material-ui/icons/Work';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Profile from '@components/Profile';
import SidebarNav from '@components/SidebarNav';
import styles from '@componentsTSStyles/sidebarStyles';

const useStyles = makeStyles(styles);

interface IProps {
  className?: string;
  onClose?: () => any;
  open: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const operations: IOperation[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    title: 'Clone',
    href: '/clone',
    icon: <CloneIcon />
  },
  {
    title: 'Operations',
    href: '/operations',
    icon: <WorkIcon />
  },
  {
    title: 'Authentication',
    href: '/sign-in',
    icon: <LockOpenIcon />
  },
  {
    title: 'Typography',
    href: '/typography',
    icon: <TextFieldsIcon />
  },
  {
    title: 'Icons',
    href: '/icons',
    icon: <ImageIcon />
  },
  {
    title: 'Account',
    href: '/account',
    icon: <AccountBoxIcon />
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />
  }
];

const Sidebar = (props: IProps) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} operations={operations} />
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

export default Sidebar;
