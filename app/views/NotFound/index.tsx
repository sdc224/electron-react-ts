import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Fab } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '@viewsTSStyles/notFoundStyles';
import pageNotFound from '@images/undraw_page_not_found_su7k.svg';

const useStyles = makeStyles(styles);

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <Fab size="small" onClick={handleBack}>
                <ArrowBackIcon />
              </Fab>
              <div className={classes.content}>
                <Typography variant="h1">
                  404: The page you are looking for isn’t here
                </Typography>
                <Typography variant="subtitle2">
                  You either tried some shady route or you came here by mistake.
                  Whichever it is, try using the navigation
                </Typography>
              </div>
            </div>
            <img
              alt="Under development"
              className={classes.image}
              src={pageNotFound}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
