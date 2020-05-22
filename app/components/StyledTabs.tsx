import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from '@componentsTSStyles/styledTabsStyles';

const useStyles = makeStyles(styles);

interface IStyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs: React.FC<IStyledTabsProps> = (props: IStyledTabsProps) => {
  const classes = useStyles();
  return (
    <Tabs
      classes={{ indicator: classes.indicator }}
      {...props}
      TabIndicatorProps={{ children: <div /> }}
    />
  );
};

interface IStyledTabProps {
  label: string;
}

const StyledTab: React.FC<IStyledTabProps> = (props: IStyledTabProps) => {
  const classes = useStyles();
  return <Tab classes={{ root: classes.root }} disableRipple {...props} />;
};

export { StyledTabs, StyledTab };
