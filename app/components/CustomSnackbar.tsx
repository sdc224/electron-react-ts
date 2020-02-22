import React from 'react';
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
} from '@componentsTSStyles/customSnackbarStyles';
import { useSnackbar } from '@ducks/snackbar/selectors';

// TODO material-ui/lab

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(snackbarContentStyles);

interface IContent {
  kind?: string;
  message?: string;
  variant?: keyof typeof variantIcon;
}

interface ISnackbarProps {
  className?: string;
}

interface ISnackbarContentProps extends IContent, ISnackbarProps {
  onClose(_event: React.SyntheticEvent | MouseEvent, reason?: string): void;
  muiSnackbarContentVariant?: 'elevation' | 'outlined';
}

const textOnVariant = {
  success: 'This is a success message',
  warning: 'This is a warning message',
  error: 'This is an Error message',
  info: 'This is an information message'
};

const MySnackbarContentWrapper = React.forwardRef(
  (props: ISnackbarContentProps, ref) => {
    const classes = useStyles1();
    const {
      className,
      onClose,
      variant = 'info',
      muiSnackbarContentVariant = 'elevation',
      message = textOnVariant[variant!],
      ...other
    } = props;
    const Icon = variantIcon[variant!];

    return (
      <SnackbarContent
        ref={ref}
        variant={muiSnackbarContentVariant}
        classes={{ root: classes.contentRoot }}
        className={clsx(classes[variant!], className)}
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
            onClick={onClose!}
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

export default function CustomSnackbar({ className }: ISnackbarProps) {
  const classes = useStyles2();
  const { snackbarState, closeSnackbar } = useSnackbar();
  const queueRef = React.useRef<IContent[]>([]);
  const isFirstRun = React.useRef(true);
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState<IContent | undefined>(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setContent(queueRef.current.shift());
      setOpen(true);
    }
  };

  // Using as componentDidUpdate
  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (snackbarState && snackbarState.kind)
      queueRef.current.push({
        kind: `${snackbarState.kind}+${new Date().getTime()}`,
        // kind: snackbarState.kind,
        message: snackbarState.text,
        variant: snackbarState.variant
      });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  }, [snackbarState.kind]);

  const handleClose = (
    _event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    closeSnackbar();
  };

  const handleExited = () => {
    processQueue();
  };

  // TODO : Slide Animation
  // const SlideTransition = (p: TransitionProps) => (
  //   <Slide {...p} direction="right" mountOnEnter unmountOnExit />
  // );

  if (!content || !content.kind) return null;

  // TODO introduce another component for better modularity
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      classes={{ root: classes.snackbarRoot }}
      className={className}
      key={content?.kind!}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      onExited={handleExited}
    >
      <MySnackbarContentWrapper
        className={className}
        key={content?.message!}
        kind={content?.kind!}
        onClose={handleClose}
        variant={content?.variant!}
        message={content?.message!}
      />
    </Snackbar>
  );
}
