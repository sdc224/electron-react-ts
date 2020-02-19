import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  Chip,
  Button,
  Typography,
  Backdrop
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

// interface IRepoProps {
//   loading: boolean;
//   projects: Array<ProjectSchema>;
//   error?: {};
// }

// TODO: Need to use this component, refer comments below
// const RepoList = ({ loading, projects, error }: IRepoProps) => {
//   const classes = useStyles();
//   if (loading) {
//     return (
//       // <CircularLoading height="10vh" style={{ flexDirection: 'column' }}>
//       //   <div>Please wait while we are fetching repositories</div>
//       // </CircularLoading>
//       <div className={classes.selectRightArea}>
//         <CircularProgress size={20} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={classes.selectRightArea}>
//         <ErrorIcon color="error" />
//       </div>
//     );
//   }

//   return (
//     <Popover open id="select" style={{ height: 400 }}>
//       {projects.map((project, index) => (
//         // <MenuItem key={project.id} value={index}>
//         <div key={project.id} style={{ display: 'flex' }}>
//           {/* <Checkbox /> */}
//           <div>
//             <div>{project.name}</div>
//             <div>{project.description}</div>
//             <div>{project.namespace.name}</div>
//             {/* <div>{project.repository_access_level}</div>
//             <div>{project.description}</div>
//             <div>{project.namespace}</div> */}
//           </div>
//         </div>
//         // </MenuItem>
//       ))}
//     </Popover>
//   );
// };

// TODO : New Select Component(In Progress)
// TODO : Add Refresh Button
/* <div
  className={classes.selectDiv}
  id="select"
  onClick={getProjects}
  onKeyPress={getProjects}
  role="button"
  tabIndex={0}
>
  <RepoList
    loading={cloneState!.loading}
    projects={cloneState!.projects}
    error={cloneState!.error}
  />
</div>; */

const Clone: React.FC = () => {
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
    getProjects();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClonedRepo(event.target.value as number[]);
  };

  // TODO Multiple
  // Sorry right now we support cloning of only the first selected Repo
  const handleClick = async () => {
    // Error Handling
    if (
      clonedRepo.length === 0 ||
      !cloneState.projects ||
      cloneState.projects.length === 0
    )
      return;

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
        cloneState.projects[clonedRepo[0]].ssh_url_to_repo,
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

  // TODO : Autocomplete Material UI Lab, New Select Component(See above)
  // TODO : use LabelValue component
  return (
    <div className={classes.root}>
      <header>
        <Typography variant="h5" className={classes.headerText}>
          Select the repository you want to Clone
        </Typography>
        <hr />
      </header>
      <main className={classes.main}>
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
            // TODO : Deletable Chip
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as number[])
                  .map(i => cloneState!.projects[i]!.name)
                  .map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
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
                <MenuItem
                  key={project.id}
                  value={index}
                  style={{ width: '100%' }}
                >
                  <Checkbox checked={clonedRepo.indexOf(index) > -1} />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: `calc(100% - 50px)`
                    }}
                  >
                    <div style={{ width: '85%' }}>
                      <Typography noWrap variant="subtitle2">
                        {project.name}
                      </Typography>
                      <Typography noWrap variant="caption">
                        {project.description}
                      </Typography>
                    </div>
                    <Typography
                      noWrap
                      variant="overline"
                      style={{ width: '15%', textAlign: 'right' }}
                    >
                      {project.id}
                    </Typography>
                  </div>
                </MenuItem>
              ))
            )}
          </Select>
          <Button
            className={classes.cloneButton}
            variant="contained"
            color="secondary"
            onClick={handleClick}
            disabled={clonedRepo.length === 0}
          >
            Clone
          </Button>
        </FormControl>
      </main>
      {/* TODO */}
      {/* Waiting for material-ui/lab */}
      <Backdrop
        className={classes.progressBackdrop}
        open={cloneState!.showProgress}
      >
        <ProgressBar
          open={cloneState!.showProgress}
          {...progressBarProps}
          value={progressState.progressState.value * 100}
        >
          <Typography className={classes.progressText} variant="caption">
            {progressState.progressState.title}
            {`... `}
            {parseInt((progressState.progressState.value * 100).toString(), 10)}
            %
          </Typography>
        </ProgressBar>
      </Backdrop>
      <CustomSnackbar />
    </div>
  );
};

export default Clone;
