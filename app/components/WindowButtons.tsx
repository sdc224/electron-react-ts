import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import {
  minimizeWindow,
  maximizeWindow,
  unMaximizeWindow,
  closeWindow,
  isMaximized
} from '@app/electronFunctions';
import { makeStyles } from '@material-ui/core';
import styles from '@tsStyles/styles/components/windowButtonStyles';

interface IWindowButtonProps {
  classes?: any;
  className?: string;
  text?: string;
  maximizedState?: boolean;
  enableMaximize?: boolean;
  click: () => any;
}

interface IMaximizeButtonProps {
  classes?: any;
  maximizedState: boolean;
}

interface ICloseButtonProps {
  classes?: any;
}

const MaximizeButton: React.FC<IMaximizeButtonProps> = ({
  maximizedState
}: IMaximizeButtonProps) =>
  maximizedState ? (
    <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>&#xE922;</span>
  ) : (
    <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>&#xE923;</span>
  );

const WindowButton: React.FC<IWindowButtonProps> = ({
  classes,
  className,
  click,
  text,
  enableMaximize,
  maximizedState
}: IWindowButtonProps) => (
  <Button
    className={clsx(className, classes.windowButtons)}
    onClick={click}
    color="inherit"
    disableRipple
    disableFocusRipple
    disableTouchRipple
  >
    {enableMaximize ? (
      <MaximizeButton maximizedState={maximizedState!} />
    ) : (
      <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>{text}</span>
    )}
  </Button>
);

const CloseButton: React.FC<ICloseButtonProps> = ({
  classes
}: ICloseButtonProps) => (
  <WindowButton
    classes={classes}
    className={classes.closeButton}
    text="&#xE8BB;"
    click={closeWindow}
  />
);

const useStyles = makeStyles(styles);

const WindowButtons: React.FC = () => {
  const classes = useStyles();
  const [maximizedState, setMaximizedState] = React.useState(isMaximized());

  React.useEffect(() => {
    setMaximizedState(isMaximized());
  }, [isMaximized()]);

  const maximize = () => {
    if (isMaximized()) {
      unMaximizeWindow();
      setMaximizedState(false);
    } else {
      maximizeWindow();
      setMaximizedState(true);
    }
  };

  return (
    <>
      <WindowButton classes={classes} text="&#xE921;" click={minimizeWindow} />
      <WindowButton
        classes={classes}
        enableMaximize
        maximizedState={maximizedState}
        click={maximize}
      />
      <CloseButton classes={classes} />
    </>
  );
};

export default WindowButtons;
