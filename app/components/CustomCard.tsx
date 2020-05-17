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
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(styles);

interface ICustomCard {
  avatarColor?: string;
  avatarText?: string;
  title?: string;
  info?: string;
  id?: number | string;
  body?: React.ReactNode;
  cardActionButtons?: React.ReactElement;
}

export default function CustomCard({
  avatarColor = '',
  avatarText = 'NA',
  title = 'No title available',
  info = 'No info available',
  id = 'No id available',
  body = 'No description available',
  cardActionButtons
}: ICustomCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        classes={{ title: classes.cardHeaderTitle }}
        avatar={
          <Tooltip title={`Project ID: ${id}`}>
            <Avatar style={{ backgroundColor: avatarColor }}>
              {avatarText}
            </Avatar>
          </Tooltip>
        }
        action={
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
      {cardActionButtons && <CardActions>{cardActionButtons}</CardActions>}
    </Card>
  );
}
