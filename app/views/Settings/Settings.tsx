import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import styles from '@viewsTSStyles/settingsStyles';

import { Notifications, AccessToken } from './components';

const useStyles = makeStyles(styles);

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Notifications />
        </Grid>
        <Grid item md={5} xs={12}>
          <AccessToken />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
