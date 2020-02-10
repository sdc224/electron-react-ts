/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, ListProps } from '@material-ui/core';
import styles from '@tsStyles/styles/components/sidebarNavStyles';
import { IOperationState } from '@ducks/operation/types';

const useStyles = makeStyles(styles);

interface IHybridButtonProps {
  operation: IOperationState;
}

interface IProps {
  className?: string;
  operations: Array<IOperationState>;
}

const CustomRouterLink = forwardRef<HTMLDivElement, NavLinkProps>(
  (props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  )
);

const HybridButton = ({ operation }: IHybridButtonProps) => {
  const classes = useStyles();

  if (operation.href)
    return (
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={CustomRouterLink}
        to={operation.href}
      >
        <div className={classes.icon}>{operation.icon}</div>
        {operation.title}
      </Button>
    );
  return (
    <Button className={classes.button} onClick={operation.click}>
      <div className={classes.icon}>{operation.icon}</div>
      {operation.title}
    </Button>
  );
};

const SidebarNav = (props: IProps & ListProps) => {
  const { operations, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {operations.map(operation => (
        <ListItem className={classes.item} disableGutters key={operation.title}>
          <HybridButton operation={operation} />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNav;
