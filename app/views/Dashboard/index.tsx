import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@viewsTSStyles/dashboardStyles';
import RepositoryGrid from './RepositoryGrid';

const useStyles = makeStyles(styles);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        Repository Grid
        <hr />
      </header>
      <main>
        <RepositoryGrid />
      </main>
    </div>
  );
};

export default Dashboard;
