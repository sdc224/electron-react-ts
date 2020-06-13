import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import infinityLoading from '@images/Infinity-1s-200px.svg';
import styles from '@componentsTSStyles/circularLoadingStyles';

interface IInfinityLoadingProps {
  fullHeight?: boolean;
}

const useStyles = makeStyles(styles);

const InfinityLoading = ({ fullHeight = false }: IInfinityLoadingProps) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.parentDiv, { [classes.fullHeight]: fullHeight })}
    >
      <img alt="Loading..." src={infinityLoading} />
    </div>
  );
};

export default InfinityLoading;
