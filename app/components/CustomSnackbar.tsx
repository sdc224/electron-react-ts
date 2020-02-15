import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import Slide from '@material-ui/core/Slide';
import {
  snackbarStyles,
  snackbarContentStyles
} from '@tsStyles/styles/components/customSnackbarStyles';

// TODO material-ui/lab

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(snackbarContentStyles);

interface ISnackbarContentProps {
  className?: string;
  message?: string;
  onClose: () => void;
  variant: keyof typeof variantIcon;
  muiSnackbarContentVariant?: 'elevation' | 'outlined';
}

interface ISnackbarProps extends ISnackbarContentProps {
  open: boolean;
}

const MySnackbarContentWrapper = React.forwardRef(
  (props: ISnackbarContentProps, ref) => {
    const classes = useStyles1();
    const {
      className,
      message,
      onClose,
      variant,
      muiSnackbarContentVariant = 'elevation',
      ...other
    } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        ref={ref}
        variant={muiSnackbarContentVariant}
        classes={{ root: classes.contentRoot }}
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  }
);

MySnackbarContentWrapper.displayName = 'MySnackbarContentWrapper';

const useStyles2 = makeStyles(snackbarStyles);

const textOnVariant = {
  success: 'This is a success message',
  warning: 'This is a warning message',
  error: 'This is an Error message',
  info: 'This is an information message'
};

export default function CustomSnackbar({
  className,
  variant = 'info',
  open,
  onClose,
  message = textOnVariant[variant]
}: ISnackbarProps) {
  const classes = useStyles2();

  function handleClose(_event?: SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  }

  // TODO : Slide Animation
  // const SlideTransition = (p: TransitionProps) => (
  //   <Slide {...p} direction="right" mountOnEnter unmountOnExit />
  // );

  // TODO introduce another component for better modularity
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      classes={{ root: classes.snackbarRoot }}
      className={className}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        key={message}
        className={className}
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}
