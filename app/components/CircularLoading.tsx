import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '@tsStyles/styles/components/circularLoadingStyles';

interface IProps {
  height: string;
  children?: React.ReactNode;
  style: object;
}

const useStyles = makeStyles(styles);

const CircularLoading = ({ height, children, style }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.parentDiv} style={{ height, ...style }}>
      {children}
      <CircularProgress />
    </div>
  );
};

export default CircularLoading;
