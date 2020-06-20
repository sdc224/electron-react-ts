import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
// import CheckIcon from '@material-ui/icons/Check';
// import SaveIcon from '@material-ui/icons/Save';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@componentsTSStyles/loadingButtonStyles';
import { ProgressBarProps } from '@ducks/progress/types';
import { useProgress } from '@app/state/ducks/progress/selectors';

interface IButtonContentProps {
  content?: string | React.ReactNode;
  loadingContent?: string | React.ReactNode;
  errorContent?: string | React.ReactNode;
  buttonStyles?: string;
}

interface ILoadingButtonProps extends IButtonContentProps {
  className?: string;
  children?: React.ReactNode;
  onClick(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  buttonType?: 'normal' | 'fab';
  buttonText: string;
  disabled?: boolean;
  kind: string;
  progressColor?: 'primary' | 'secondary';
}

interface IFabButtonProps extends ProgressBarProps {
  buttonClassName?: string;
  onClick(): void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const useStyles = makeStyles(styles);

// TODO : Error Fab
const FabButton = ({
  onClick,
  buttonClassName,
  // icon = <SaveIcon />,
  disabled
}: IFabButtonProps) => {
  // const classes = useStyles();
  return (
    <>
      <Fab
        aria-label="Save"
        color="primary"
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {/* TODO */}
        {/* {reducer.success ? <CheckIcon /> : icon} */}
      </Fab>
      {/* TODO */}
      {/* {reducer.loading && (
        <CircularProgress
          size={68}
          className={classes.fabProgress}
          {...props}
        />
      )} */}
    </>
  );
};

export default function LoadingButton({
  className,
  onClick,
  buttonType = 'normal',
  buttonText,
  buttonStyles,
  disabled,
  kind,
  progressColor = 'secondary'
}: ILoadingButtonProps) {
  const classes = useStyles();

  const { progressState } = useProgress();

  const buttonClassName = clsx({
    [classes.buttonSuccess]: progressState.value === 100
  });

  let buttonContent: React.ReactNode;

  let newVariant = progressState.variant;

  if (progressState.progressType === 'circular') {
    if (progressState.variant === 'buffer' || progressState.variant === 'query')
      newVariant = 'indeterminate';
  } else if (progressState.progressType === 'linear') {
    if (progressState.variant === 'static') newVariant = 'indeterminate';
  }

  // TODO : Apply custom styling using props
  if (buttonType === 'fab')
    buttonContent = (
      <FabButton onClick={onClick} buttonClassName={buttonClassName} />
    );
  else
    buttonContent = (
      <>
        <Button
          variant="contained"
          color="primary"
          className={clsx(classes.button, buttonClassName, buttonStyles)}
          disabled={disabled || progressState.init}
          onClick={onClick}
        >
          {buttonText}
        </Button>
        {progressState.init &&
          progressState.kind === kind &&
          (progressState.progressType === 'circular' ? (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
              variant={newVariant as CircularProgressVariant}
              id={progressState.kind}
              value={progressState.value * 100}
            />
          ) : (
            <LinearProgress
              color={progressColor}
              className={classes.linearProgress}
              variant={newVariant as LinearProgressVariant}
              value={progressState.value * 100}
              id={progressState.kind}
            />
          ))}
      </>
    );

  return (
    <div className={clsx(classes.wrapper, className)}>{buttonContent}</div>
  );
}
