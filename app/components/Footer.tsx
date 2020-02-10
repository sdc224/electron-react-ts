/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import styles from '@tsStyles/styles/components/footerStyles';

const useStyles = makeStyles(styles);

interface IProps {
  className?: string;
}

const Footer = (
  props: IProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="https://github.com/sdc224" target="_blank">
          Sourodeep Chatterjee
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Created with ❤ for the environment.
      </Typography>
    </div>
  );
};

export default Footer;
