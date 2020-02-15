import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme } from '@material-ui/core';
import Topbar from '@components/Topbar';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';
import styles from '@layoutsTSStyles/mainStyles';

const useStyles = makeStyles(styles);

interface IProps {
  children?: React.ReactNode;
}

const Main = ({ children }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery<Theme>(
    (theme as Theme).breakpoints.up('lg'),
    {
      defaultMatches: true
    }
  );

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
