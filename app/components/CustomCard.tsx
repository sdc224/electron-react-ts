/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '@componentsTSStyles/cardStyles';

const useStyles = makeStyles(styles);

interface ICustomCard {
  avatarColor?: string;
  avatarText?: string;
  title?: string;
  info?: string;
  id?: number | string;
  body?: React.ReactNode;
  buttonContent?: string;
}

export default function CustomCard({
  avatarColor = '',
  avatarText = 'NA',
  title = 'No title available',
  info = 'No info available',
  id = 'No id available',
  body = 'No description available',
  buttonContent = 'No Button'
}: ICustomCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        classes={{ title: classes.cardHeaderTitle }}
        avatar={
          <Avatar style={{ backgroundColor: avatarColor }}>{avatarText}</Avatar>
        }
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={info}
        subheader={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{buttonContent}</Button>
      </CardActions>
    </Card>
  );
}
