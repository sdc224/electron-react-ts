import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  AppBarProps,
  Typography,
  Hidden
} from '@material-ui/core';
import GitIcon from '@tsStyles/icons/GitIcon';
import styles from '@componentsCSSStyles/Topbar.css';
import muiStyles from '@componentsTSStyles/topbarStyles';
import WindowButtons from './WindowButtons';

const useStyles = makeStyles(muiStyles);

interface IProps {
  className?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  onSidebarOpen?: () => void;
}

const Topbar = (props: IProps & AppBarProps) => {
  const {
    className,
    onSidebarOpen,
    leftSection,
    rightSection,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest}>
      <div className={classes.toolbarArea}>
        <Toolbar className={clsx(classes.toolbar, styles.titlebar)}>
          {leftSection}
          <RouterLink to="/">
            <div className={clsx(classes.headerText, styles.titlebarButtons)}>
              <GitIcon iconColor="white" width={24} height={24} />
              <Hidden xsDown>
                <Typography variant="h3" color="inherit">
                  Gittian
                </Typography>
              </Hidden>
            </div>
          </RouterLink>
          <div className={classes.flexGrow} />
          {rightSection}
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
