import React from 'react';
import clsx from 'clsx';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import CacheStore from 'electron-store';
import { setPassword } from 'keytar';
import validate from 'validate.js';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  makeStyles,
  Toolbar,
  Backdrop,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
// import { Facebook, Twitter } from '@material-ui/icons';
import credentials from '@private/credentials';
import { Organizations } from '@commands/models/organization';
import GitlabCommon from '@commands/lib/gitlab/common';
import { RegularExpressions } from '@constants/commandConstants';
import { KeytarService, KeytarAccount } from '@constants/securityConstants';
import styles from '@viewsTSStyles/signInStyles';

// TODO : Add validator using decorators
const schema = {
  type: {
    presence: { allowEmpty: false, message: 'is required' },
    type: 'string'
  },
  organization: {
    presence: { allowEmpty: true, message: 'is required' },
    type: 'string'
  },
  accessToken: {
    presence: { allowEmpty: false, message: 'is required' },
    type: 'string',
    length: {
      minimum: 6,
      maximum: 256
    }
  }
};

const useStyles = makeStyles(styles);

type GitType = 'Personal' | 'Enterprise';

interface IValue {
  type?: GitType;
  organization?: Organizations | '';
  accessToken?: string;
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
  const [open, setOpen] = React.useState(false);

  const [formState, setFormState] = React.useState<IFormState>({
    isValid: false,
    values: {
      organization: ''
    },
    touched: {},
    errors: {}
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const getOrganization = (targetObject: any, prevFormState: IFormState) => {
    if (
      (prevFormState.values.type === 'Enterprise' ||
        targetObject.value === 'Enterprise') &&
      prevFormState.values.organization === ''
    ) {
      return undefined;
    }

    if (
      prevFormState.values.type === 'Personal' ||
      targetObject.value === 'Personal'
    )
      return '';

    if (targetObject.name === 'organization') return targetObject.value;

    return prevFormState.values.organization;
  };

  const handleChange = (event: React.ChangeEvent<any>) => {
    event.persist();

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
        organization: getOrganization(event.target, prevFormState)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpen();
    const token = formState.values.accessToken;
    if (!token) return;

    const store = new CacheStore();
    if (formState.values.type === 'Enterprise') {
      store.set('isEnterprise', true);
      store.set('organization', formState.values.organization);
    } else store.set('isEnterprise', false);

    try {
      const { gitlab } = new GitlabCommon();
      await gitlab.init(credentials(formState.values.organization, token));
      const user = await gitlab.getCurrentUser();
      store.set('userDetails', user);
    } catch (error) {
      handleClose();
      if (
        RegularExpressions.GitlabEnterpriseJSONError.test(error.message) ||
        error.message === '401'
      )
        setFormState((prevFormState: IFormState) => ({
          ...prevFormState,
          isValid: false,
          errors: { accessToken: 'Invalid Access Token' }
        }));
      else
        setFormState((prevFormState: IFormState) => ({
          ...prevFormState,
          isValid: false,
          errors: { accessToken: error.message }
        }));

      throw error;
    }

    await setPassword(
      KeytarService,
      KeytarAccount,
      formState.values.accessToken!
    );
    history.push('/dashboard');
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
            {/* <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div> */}
            <div className={classes.contentBody}>
              {/* TODO : Introduce CustomForm */}
              <form className={classes.form} onSubmit={handleSignIn}>
                {/* TODO : Uncomment below part */}
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>
                <div className={classes.signInWithInfo}>
                  <Typography color="textSecondary">
                    Sign in with personal access token
                  </Typography>
                  <Toolbar
                    className={classes.infoToolbar}
                    title="Don't have an access token? Go to gitlab, then head over to
                settings menu by clicking on your avatar. After that, you can
                see Personal Access Token in sidebar, click on it, and give it
                any name. Next tick on all the checkboxes and finally, generate
                the token. In the next page, you will get the token, copy it,
                and paste here."
                  >
                    <InfoIcon fontSize="small" />
                  </Toolbar>
                </div>
                {/* </div> */}
                {/* <Grid className={classes.socialButtons} container spacing={2}>
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
                /> */}
                <FormControl
                  variant="outlined"
                  className={clsx(
                    classes.formControl,
                    classes.formControlFirst
                  )}
                >
                  <InputLabel id="select-type">Type</InputLabel>
                  <Select
                    labelId="select-type"
                    id="select-type-id"
                    error={hasError('type')}
                    value={formState.values.type || ''}
                    onChange={handleChange}
                    label="Type"
                    name="type"
                    type="select"
                  >
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                  </Select>

                  {hasError('type') && (
                    <FormHelperText className={classes.formHelperText}>
                      {formState.errors!.type}
                    </FormHelperText>
                  )}
                </FormControl>
                {formState.values.type === 'Enterprise' && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="select-organization">
                      Organization
                    </InputLabel>
                    <Select
                      labelId="select-organization"
                      id="select-organization-id"
                      error={hasError('organization')}
                      value={formState.values.organization || ''}
                      onChange={handleChange}
                      label="Organization"
                      name="organization"
                      type="select"
                    >
                      {Object.entries(Organizations).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                    {hasError('organization') && (
                      <FormHelperText className={classes.formHelperText}>
                        {formState.errors!.organization}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <TextField
                  className={classes.textField}
                  error={hasError('accessToken')}
                  fullWidth
                  helperText={
                    hasError('accessToken')
                      ? formState.errors!.accessToken
                      : null
                  }
                  label="Access Token"
                  name="accessToken"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.accessToken || ''}
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
                  Don&apos;t have an account?&nbsp;
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
      {/* TODO : Improve by using redux */}
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SignIn;
