/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '@componentsTSStyles/cardStyles';

const useStyles = makeStyles(styles);

interface ICustomCard {
  title?: string;
  info?: string;
  id?: number | string;
  body?: React.ReactNode;
  buttonContent?: string;
}

export default function CustomCard({
  title = 'No title available',
  info = 'No info available',
  id = 'No id available',
  body = 'No description available',
  buttonContent = 'No Button'
}: ICustomCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {info}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {id}
        </Typography>
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
