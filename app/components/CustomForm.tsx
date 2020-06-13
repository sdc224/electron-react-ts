import React from 'react';
import clsx from 'clsx';
import { makeStyles, Typography, FormControl, Button } from '@material-ui/core';
import styles from '@componentsTSStyles/customFormStyles';
import LoadingButton from './LoadingButton';

interface IButtonProps {
  buttonStyles?: string;
  buttonType?: 'fab' | 'normal';
  buttonVariant?: 'text' | 'outlined' | 'contained';
  hasButtons?: boolean;
  isLoadingButton?: boolean;
  kind: string;
  onSubmit?(): void;
  disableButton?: boolean;
  buttonText?: string;
}

interface ICustomFormProps extends IButtonProps {
  className?: string;
  childrenHeader?: React.ReactNode;
  formVariant?: 'filled' | 'outlined' | 'standard';
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
  kind,
  onSubmit,
  ...props
}: IButtonProps) => {
  const classes = useStyles();

  if (isLoadingButton) {
    return (
      <LoadingButton
        buttonText={buttonText!}
        className={classes.formButton}
        onClick={onSubmit!}
        buttonType={buttonType}
        disabled={disableButton}
        kind={kind}
        {...props}
      />
    );
  }

  return (
    <Button
      className={clsx(classes.formButton, buttonStyles)}
      variant={buttonVariant}
      color="secondary"
      onClick={onSubmit!}
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
  formVariant = 'outlined',
  hasHeader,
  headerText,
  headerStyles,
  mainStyles,
  children,
  hasButtons = true,
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
        <FormControl variant={formVariant} className={classes.formControl}>
          {children}
          {hasButtons && <FormButton {...props} />}
        </FormControl>
      </main>
    </div>
  );
};

export default CustomForm;
