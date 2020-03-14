import React, { Suspense } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Tabs,
  Tab,
  Typography,
  makeStyles,
  Box,
  AppBar,
  useTheme,
  TabProps
} from '@material-ui/core';
import {
  FileCopy as CloneIcon,
  Share as ForkIcon,
  PersonPin as PersonPinIcon,
  Help as HelpIcon,
  ShoppingBasket as ShoppingBasketIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon
} from '@material-ui/icons';
import Loading from '@components/Loading';
import styles from '@viewsTSStyles/operationsStyles';

const CloneComponent = React.lazy(() => import('./Clone'));
const ForkComponent = React.lazy(() => import('./Fork'));
const MergeRequestComponent = React.lazy(() => import('./MergeRequest'));

const Clone = () => (
  <Suspense fallback={<Loading />}>
    <CloneComponent />
  </Suspense>
);

const Fork = () => (
  <Suspense fallback={<Loading />}>
    <ForkComponent />
  </Suspense>
);

const MergeRequest = () => (
  <Suspense fallback={<Loading />}>
    <MergeRequestComponent />
  </Suspense>
);

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(styles);

type OperationTabs = TabProps;

const getTabDetails = (
  label: string,
  index: number,
  icon: JSX.Element
): OperationTabs => {
  return {
    ...a11yProps(index),
    label,
    icon
  };
};

const getOperationTabs: OperationTabs[] = [
  getTabDetails('Clone', 0, <CloneIcon />),
  getTabDetails('Fork', 1, <ForkIcon />),
  getTabDetails('Merge Request', 2, <PersonPinIcon />),
  getTabDetails('Item Four', 3, <HelpIcon />),
  getTabDetails('Item Five', 4, <ShoppingBasketIcon />),
  getTabDetails('Item Six', 5, <ThumbDownIcon />),
  getTabDetails('Item Seven', 6, <ThumbUpIcon />)
];

const getOperations: ITabPanelProps[] = [
  {
    index: 0,
    value: 0,
    children: <Clone />
  },
  {
    index: 1,
    value: 1,
    children: <Fork />
  },
  {
    index: 2,
    value: 2,
    children: <MergeRequest />
  },
  {
    index: 3,
    value: 3,
    children: `Item Four`
  },
  {
    index: 4,
    value: 4,
    children: `Item Five`
  },
  {
    index: 5,
    value: 5,
    children: `Item Six`
  },
  {
    index: 6,
    value: 6,
    children: `Item Seven`
  }
];

const Operations: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // TODO : Custom React Swipeable Views, for suppressing warning message, Also reduce bundle size
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="inherit"
          aria-label="scrollable force tabs example"
        >
          {getOperationTabs.map(tab => (
            <Tab key={tab.id} {...tab} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {getOperations.map(operation => (
          <TabPanel key={operation.value} {...operation} />
        ))}
      </SwipeableViews>
    </div>
  );
};

export default Operations;
