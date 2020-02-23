import React from 'react';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@componentsTSStyles/progressBarStyles';
import { ProgressBarProps } from '@ducks/progress/types';

const useStyles = makeStyles(styles);

interface IProgressProps extends ProgressBarProps {
  divClassName?: string;
  progressClassName?: string;
  children?: React.ReactNode;
  open: boolean;
}

const ProgressBar: React.FC<IProgressProps> = ({
  children,
  divClassName,
  progressClassName,
  open,
  variant,
  ...props
}: IProgressProps) => {
  const classes = useStyles();

  if (!open) return null;

  return (
    <div className={clsx(classes.div, divClassName)}>
      <LinearProgress
        className={(classes.progressBar, progressClassName)}
        classes={{ root: classes.root, bar: classes.bar }}
        variant={variant as LinearProgressVariant}
        {...props}
      />
      {children}
    </div>
  );
};

export default ProgressBar;
