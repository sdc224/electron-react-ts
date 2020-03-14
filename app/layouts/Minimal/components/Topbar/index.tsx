import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Topbar from '@components/Topbar';
import styles from '@layoutsTSStyles/minimalTopbarStyles';

const useStyles = makeStyles(styles);

interface ITopBarMinimalProps {
  onSidebarOpen?(): void;
}

const TopbarMinimal = ({ onSidebarOpen }: ITopBarMinimalProps) => {
  const classes = useStyles();

  return <Topbar onSidebarOpen={onSidebarOpen} />;
};

export default TopbarMinimal;
