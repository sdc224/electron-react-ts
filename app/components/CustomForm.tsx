import React from 'react';
import clsx from 'clsx';
import { makeStyles, Typography, FormControl, Button } from '@material-ui/core';
import styles from '@componentsTSStyles/customFormStyles';
import LoadingButton from './LoadingButton';

interface IButtonProps {
  buttonStyles?: string;
  buttonType?: 'fab' | 'normal';
  buttonVariant?: 'text' | 'outlined' | 'contained';
  isLoadingButton?: boolean;
  onSubmit(): void;
  disableButton?: boolean;
  buttonText: string;
}

interface ICustomFormProps extends IButtonProps {
  className?: string;
  childrenHeader?: React.ReactNode;
  hasHeader?: boolean;
  headerText?: string;
  headerStyles?: string;
  mainStyles?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles(styles);

const FormButton: React.FC<IButtonProps> = ({
  buttonStyles,
  buttonVariant = 'contained',
  buttonText,
  buttonType = 'normal',
  disableButton = false,
  isLoadingButton = false,
  onSubmit,
  ...props
}: IButtonProps) => {
  const classes = useStyles();

  if (isLoadingButton) {
    return (
      <LoadingButton
        buttonText={buttonText}
        className={classes.formButton}
        onClick={onSubmit}
        buttonType={buttonType}
        disabled={disableButton}
        {...props}
      />
    );
  }

  return (
    <Button
      className={clsx(classes.formButton, buttonStyles)}
      variant={buttonVariant}
      color="secondary"
      onClick={onSubmit}
      disabled={disableButton}
    >
      {buttonText}
    </Button>
  );
};

// TODO : Get Select as well as Labels Here from Clone, with pure component logic
const CustomForm: React.FC<ICustomFormProps> = ({
  className,
  childrenHeader,
  hasHeader,
  headerText,
  headerStyles,
  mainStyles,
  children,
  ...props
}: ICustomFormProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(className)}>
      {childrenHeader ||
        (hasHeader && (
          <header>
            <Typography
              variant="h5"
              className={clsx(classes.headerText, headerStyles)}
            >
              {headerText}
            </Typography>
            <hr />
          </header>
        ))}
      <main className={clsx(classes.main, mainStyles)}>
        <FormControl variant="outlined" className={classes.formControl}>
          {children}
          <FormButton {...props} />
        </FormControl>
      </main>
    </div>
  );
};

export default CustomForm;
