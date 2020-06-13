import React from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  Chip,
  Typography
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularLoading from '@components/CircularLoading';
import CustomForm from '@components/CustomForm';
import styles from '@viewsTSStyles/cloneStyles';
import { useClone } from '@ducks/operations/selectors';
import { useProgress } from '@ducks/progress/selectors';
import { selectArrayOnIndices } from '@app/utils/objectHelper';

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
//   projects: Array<IRepository>;
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
  const { cloneState, getProjects, startCloning } = useClone();
  const progressState = useProgress();
  const [clonedRepo, setClonedRepo] = React.useState<number[]>([]);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

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

    startCloning(
      selectArrayOnIndices<IRepository>(cloneState.projects, clonedRepo),
      progressState
    );
  };

  // TODO : Autocomplete Material UI Lab, New Select Component(See above)
  // TODO : use LabelValue component, CustomForm with Select
  return (
    <div className={classes.root}>
      <CustomForm
        hasHeader
        headerText="Select the repository you want to Clone"
        buttonText="Clone"
        onSubmit={handleClick}
        disableButton={clonedRepo.length === 0}
        isLoadingButton
        kind="clone"
      >
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
            <CircularLoading height="10vh" style={{ flexDirection: 'column' }}>
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
      </CustomForm>
      {/* TODO : Move to Tab Page to cover tabs, need SAGA changes */}
      {/* Waiting for material-ui/lab */}
      {/* <Backdrop
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
      </Backdrop> */}
    </div>
  );
};

export default Clone;
