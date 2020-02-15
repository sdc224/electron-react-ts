import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from '@tsStyles/styles/components/profileStyles';

const useStyles = makeStyles(styles);

interface IProps {
  className?: string;
}

const Profile = (
  props: IProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Sourodeep Chatterjee',
    alt: 'S',
    avatar: undefined,
    bio: 'Solving Deadlocks'
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt={user.alt}
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

export default Profile;
