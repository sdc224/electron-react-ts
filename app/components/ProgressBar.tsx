import React from 'react';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@tsStyles/styles/components/progressBarStyles';
import { ProgressBarProps } from '@ducks/progress/types';

const useStyles = makeStyles(styles);

interface IProgressProps extends ProgressBarProps {
  divClassName?: string;
  progressClassName?: string;
  children?: React.ReactNode;
}

const ProgressBar: React.FC<IProgressProps> = ({
  children,
  divClassName,
  progressClassName,
  ...props
}: IProgressProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.div, divClassName)}>
      <LinearProgress
        className={(classes.progressBar, progressClassName)}
        classes={{ root: classes.root, bar: classes.bar }}
        {...props}
      />
      {children}
    </div>
  );
};

export default ProgressBar;
