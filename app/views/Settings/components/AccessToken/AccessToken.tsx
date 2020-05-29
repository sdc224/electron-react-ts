import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

interface IAccessTokenProps {
  className?: string;
}

const AccessToken = ({ className, ...rest }: IAccessTokenProps) => {
  const [values, setValues] = React.useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card {...rest} className={className}>
      <form>
        <CardHeader subheader="Update access token" title="Access Token" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Access Token"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm Access Token"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined">
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default AccessToken;
