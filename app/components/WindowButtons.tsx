import React from 'react';
import clsx from 'clsx';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import {
  minimizeWindow,
  maximizeWindow,
  unMaximizeWindow,
  closeWindow,
  isMaximized
} from '@app/electronFunctions';
import styles from '@componentsTSStyles/windowButtonStyles';

interface IWindowButtonProps {
  classes?: ReturnType<typeof createStyles>;
  className?: string;
  text?: string;
  children?: React.ReactNode;
  click: () => void;
}

const useStyles = makeStyles(styles);

const WindowButton: React.FC<IWindowButtonProps> = ({
  className,
  click,
  text,
  children
}: IWindowButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(className, classes.windowButtons)}
      onClick={click}
      color="inherit"
      disableRipple
      disableFocusRipple
      disableTouchRipple
    >
      {children || (
        <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>{text}</span>
      )}
    </Button>
  );
};

const MinimizeButton: React.FC = () => (
  <WindowButton text="&#xE921;" click={minimizeWindow} />
);

const MaximizeButton: React.FC = () => {
  const [maximizedState, setMaximizedState] = React.useState(false);

  const setMaximizedStateAsync = React.useCallback(() => isMaximized(), [
    isMaximized
  ]);

  React.useEffect(() => {
    setMaximizedStateAsync()
      .then((state) => setMaximizedState(state))
      .catch((err) => {
        throw err;
      });
  }, []);

  const maximize = async () => {
    if (await isMaximized()) {
      unMaximizeWindow();
      setMaximizedState(false);
    } else {
      maximizeWindow();
      setMaximizedState(true);
    }
  };
  return (
    <WindowButton click={maximize}>
      {maximizedState ? (
        <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>&#xE923;</span>
      ) : (
        <span style={{ fontFamily: 'Segoe MDL2 Assets' }}>&#xE922;</span>
      )}
    </WindowButton>
  );
};

const CloseButton: React.FC = () => {
  const classes = useStyles();
  return (
    <WindowButton
      className={classes.closeButton}
      text="&#xE8BB;"
      click={closeWindow}
    />
  );
};

const WindowButtons: React.FC = () => {
  return (
    <>
      <MinimizeButton />
      <MaximizeButton />
      <CloseButton />
    </>
  );
};

export default WindowButtons;
