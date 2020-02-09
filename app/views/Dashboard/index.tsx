import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import styles from '@tsStyles/styles/views/dashboardStyles';
// import HeaderModel from '@containers/HeaderModel';
// import SideDrawerModel from '@containers/SideDrawerModel';
// import OperationModel from '@containers/OperationModel';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(styles);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline />
      <SideDrawerModel />
      <main className={classes.main}>
        <HeaderModel />
        <OperationModel />
      </main>
      <footer className={classes.footer} /> */}
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          Hello
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
