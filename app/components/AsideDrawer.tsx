import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '@tsStyles/styles/components/drawerStyles';
import {
  CloneIcon,
  ForkIcon,
  UpdateIcon,
  CreateMRIcon,
  FeatureBranchIcon
} from '@tsStyles/icons/OperationIcons';
import { useHistory } from 'react-router';

const useStyles = makeStyles(styles);

interface IOperation {
  text: string;
  icon: React.ReactElement;
  click: () => void;
}

// TODO: name change
const operationsList1: IOperation[] = [
  {
    text: 'Clone',
    icon: <CloneIcon />,
    click: () => {}
  },
  {
    text: 'Fork',
    icon: <ForkIcon />,
    click: () => {}
  },
  {
    text: 'Update',
    icon: <UpdateIcon />,
    click: () => {}
  }
];

// TODO: name change
const operationsList2: IOperation[] = [
  {
    text: 'Create MR',
    icon: <CreateMRIcon />,
    click: () => {}
  },
  {
    text: 'Feature Branch',
    icon: <FeatureBranchIcon />,
    click: () => {}
  }
];

const AsideDrawer = (): JSX.Element => {
  const classes = useStyles();
  const { goBack } = useHistory();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="back" onClick={goBack}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {operationsList1.map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {operationsList2.map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AsideDrawer;
