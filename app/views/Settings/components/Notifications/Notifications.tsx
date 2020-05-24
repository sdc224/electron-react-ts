import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

import styles from './notificationsStyles';

const useStyles = makeStyles(styles);

interface INotificationProps {
  className?: string;
}

const Notifications = ({ className, ...rest }: INotificationProps) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Notifications
              </Typography>
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Text Messages"
              />
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Phone calls"
              />
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Messages
              </Typography>
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Phone calls"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default Notifications;
