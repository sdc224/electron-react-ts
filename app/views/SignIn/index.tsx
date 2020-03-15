/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import validate from 'validate.js';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Facebook, Twitter } from '@material-ui/icons';
import styles from '@viewsTSStyles/signInStyles';

// TODO : Add validator using decorators
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(styles);

// interface ISignInProps {}

interface IValue {
  email?: string;
  password?: string;
}

interface IFormState {
  isValid: boolean;
  values: IValue;
  touched: IValue;
  errors: IValue;
}

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (event: any) => {
    event.persist();

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = (event: any) => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = (field: keyof IValue) =>
    !!(formState.touched[field] && formState.errors[field]);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam,
                eius dolorum. Excepturi repudiandae suscipit, rem ipsum incidunt
                totam.
              </Typography>
              <div>
                <Typography className={classes.name} variant="body1">
                  Sourodeep Chatterjee
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Open Source Contributor
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Sign in with social media
                </Typography>
                <Grid className={classes.socialButtons} container spacing={2}>
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <Facebook className={classes.socialIcon} />
                      <span>Login with Facebook</span>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <Twitter className={classes.socialIcon} />
                      <span>Login with Twitter</span>
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors!.email![0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors!.password![0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                    className={classes.signUpLink}
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
