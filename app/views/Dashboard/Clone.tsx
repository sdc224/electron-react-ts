import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  Chip,
  Button,
  Typography
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularLoading from '@components/CircularLoading';
import ProgressBar from '@components/ProgressBar';
import CustomSnackbar from '@components/CustomSnackbar';
import styles from '@viewsTSStyles/cloneStyles';
import { useClone } from '@ducks/clone/selectors';
import { openFolderSystemDialog } from '@app/electronFunctions';
import Git from '@commands/git';
import { useProgress } from '@ducks/progress/selectors';
import CloningRepositoriesStore from '@ducks/progress/cloning';
import { ProgressBarProps } from '@ducks/progress/types';
import { useSnackbar } from '@ducks/snackbar/selectors';

const useStyles = makeStyles(styles);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

interface IProps {
  loading: boolean;
  projects: [];
  error?: {};
}

/* interface IRepoProps {
  loading: boolean;
  projects: Array<ProjectSchema>;
  error?: {};
} */

// TODO: Need to use this component, refer comments below
/* const RepoList = ({ loading, projects, error }: IRepoProps) => {
  if (loading) {
    return (
      <CircularLoading height="10vh" style={{ flexDirection: 'column' }}>
        <div>Please wait while we are fetching repositories</div>
      </CircularLoading>
    );
  }

  if (error) {
    return <div>Unexpected Error</div>;
  }

  return [
    <MenuItem key="none" value="">
      <em>None</em>
    </MenuItem>,
    projects.map((project, index) => (
      <MenuItem key={project.id} value={index}>
        <Checkbox />
        {project.name}
      </MenuItem>
    ))
  ];
}; */

const Clone: React.FC<IProps> = () => {
  const classes = useStyles();
  const { cloneState, getProjects, showCloneProgress } = useClone();
  const { openSnackbar } = useSnackbar();
  const progressState = useProgress();
  const [clonedRepo, setClonedRepo] = React.useState<number[]>([]);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const progressBarProps: ProgressBarProps = {
    color: 'primary',
    variant: 'determinate'
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClonedRepo(event.target.value as number[]);
  };

  // TODO Delete
  const handleClick = async () => {
    const folder = await openFolderSystemDialog();

    if (folder.canceled) return;

    try {
      // TODO : Repo Path Delete
      const test = new Git(folder.filePaths[0]);
      // TODO : Uncomment whenever Dugite works without Git
      // await test.init();
      showCloneProgress();
      const cloneProgress = new CloningRepositoriesStore(test, progressState);
      const val = await cloneProgress.clone(
        'https://github.com/sdc224/SouroRepo.git',
        folder.filePaths[0],
        {}
      );
      if (val) {
        progressState.handleProgress({
          title: 'Cloning Completed',
          value: 1
        });
        openSnackbar({
          kind: 'Clone',
          text: 'Cloning Successfully Completed',
          variant: 'success'
        });
      } else
        progressState.handleProgress({ title: 'Cloning Failed', value: 0 });
    } catch (error) {
      // TODO : change progress bar color to red
      openSnackbar({
        kind: 'Clone',
        text: error.message.toString(),
        variant: 'error'
      });
    } finally {
      setTimeout(() => {
        showCloneProgress();
      }, 2000);
    }
  };

  // TODO: Create Own Component for Select
  return (
    <div className={classes.root}>
      <header>Select the repository you want to Clone</header>
      <main>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="repo-select-label">
            Please select any project from the list
          </InputLabel>
          <Select
            labelId="repo-select-label"
            id="repo-select"
            multiple
            value={clonedRepo}
            onChange={handleChange}
            labelWidth={labelWidth}
            onOpen={getProjects}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected &&
                  (selected as number[])
                    .filter(s => !!s)
                    .map(i => cloneState!.projects[i]!.name)
                    .map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {/* Need to disable the nested ternary for Select issue */}
            {/* Github Issue: https://github.com/mui-org/material-ui/issues/14943 */}
            {/* Github Issue: https://github.com/mui-org/material-ui/issues/16181 */}
            {/* TODO: Convert to use the above Component RepoList(Commented out right now) */}
            {/* eslint-disable-next-line no-nested-ternary */}
            {cloneState!.loading ? (
              <CircularLoading
                height="10vh"
                style={{ flexDirection: 'column' }}
              >
                <div>Please wait while we are fetching repositories</div>
              </CircularLoading>
            ) : cloneState!.error ? (
              <div>Unexpected Error</div>
            ) : (
              cloneState!.projects.map((project, index) => (
                <MenuItem key={project.id} value={index}>
                  <Checkbox checked={clonedRepo.indexOf(index) > -1} />
                  <div>
                    <div>{project.name}</div>
                    <div>{project.repository_access_level}</div>
                    <div>{project.description}</div>
                    <div>{project.namespace}</div>
                  </div>
                </MenuItem>
              ))
            )}
            {/*
            <RepoList
              loading={cloneState!.loading}
              projects={cloneState!.projects}
              error={cloneState!.error}
            /> */}
          </Select>
          <Button onClick={handleClick}>Test</Button>
          {cloneState!.showProgress && (
            <ProgressBar
              {...progressBarProps}
              value={progressState.progressState.value * 100}
            >
              <Typography style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                {progressState.progressState.title}
                {`... `}
                {parseInt(
                  (progressState.progressState.value * 100).toString(),
                  10
                )}
                %
              </Typography>
            </ProgressBar>
          )}
        </FormControl>
      </main>
      {/* TODO */}
      {/* Waiting for material-ui/lab */}
      <CustomSnackbar />
    </div>
  );
};

export default Clone;
