import React from 'react';
// nodejs library that concatenates classes
// import classNames from 'classnames';
// nodejs library to set properties for components

// material-ui components
// import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(styles);

type OperationButtonProps = {
  color:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'transparent';
  size: 'sm' | 'lg';
  simple?: boolean;
  round?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string;
  muiClasses?: object;
  children: React.ReactNode;
};

export default function OperationButton(
  props: OperationButtonProps
): JSX.Element {
  // const classes = useStyles();
  const {
    // color,
    // round,
    // children,
    // disabled,
    // simple,
    // size,
    // block,
    // link,
    // justIcon,
    // className = '',
    muiClasses
    // ...rest
  } = props;
  // const btnClasses = classNames({
  //   [classes.button]: true,
  //   [classes[size]]: size,
  //   [classes[color]]: color,
  //   [classes.round]: round,
  //   [classes.disabled]: disabled,
  //   [classes.simple]: simple,
  //   [classes.block]: block,
  //   [classes.link]: link,
  //   [classes.justIcon]: justIcon,
  //   [className]: className,
  // });
  return (
    <Button
      // {...rest}
      classes={muiClasses}
      // className={btnClasses}
    >
      {children}
    </Button>
  );
}
