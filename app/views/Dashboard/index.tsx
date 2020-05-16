import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AppBar, Typography, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from '@viewsTSStyles/dashboardStyles';
import RepositoryGrid from './RepositoryGrid';

const useStyles = makeStyles(styles);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <header className={classes.header}>
          <Typography variant="h4">Repositories</Typography>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </header>
      </AppBar>
      <main className={classes.main}>
        <RepositoryGrid />
      </main>
    </div>
  );
};

export default Dashboard;
