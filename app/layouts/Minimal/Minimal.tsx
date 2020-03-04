import React from 'react';
import { makeStyles } from '@material-ui/core';
import styles from '@layoutsTSStyles/minimalStyles';
import Topbar from './components/Topbar';

const useStyles = makeStyles(styles);

interface IMinimalProps {
  className?: string;
  children?: React.ReactNode;
}

const Minimal = ({ children }: IMinimalProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Minimal;
