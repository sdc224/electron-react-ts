import React from 'react';
import { ProjectSchema } from 'gitlab';
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
import { useProgress } from '@ducks/progress/selectors';
import { useFork } from '@ducks/operations/selectors';
import { selectArrayOnIndices } from '@utils/objectHelper';

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

const Fork: React.FC = () => {
  const classes = useStyles();
  const { forkState, getProjects, startForking } = useFork();
  const [forkedRepo, setForkedRepo] = React.useState<number[]>([]);
  const progressState = useProgress();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
    getProjects();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setForkedRepo(event.target.value as number[]);
  };

  // TODO Multiple
  // Sorry right now we support cloning of only the first selected Repo
  const handleClick = async () => {
    // Error Handling
    if (
      forkedRepo.length === 0 ||
      !forkState.projects ||
      forkState.projects.length === 0
    )
      return;

    startForking(
      selectArrayOnIndices<ProjectSchema>(forkState.projects, forkedRepo),
      progressState
    );
  };

  // TODO : Autocomplete Material UI Lab, New Select Component(See above)
  // TODO : use LabelValue component, CustomForm with Select
  return (
    <div className={classes.root}>
      <CustomForm
        hasHeader
        headerText="Select the repository you want to Fork"
        buttonText="Fork"
        onSubmit={handleClick}
        disableButton={forkedRepo.length === 0}
        isLoadingButton
      >
        <InputLabel ref={inputLabel} id="repo-select-label-fork">
          Please select any project from the list
        </InputLabel>
        <Select
          labelId="repo-select-label-fork"
          id="repo-select-fork"
          multiple
          value={forkedRepo}
          onChange={handleChange}
          labelWidth={labelWidth}
          // TODO : Deletable Chip
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as number[])
                .map(i => forkState!.projects[i]!.name)
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
          {forkState!.loading ? (
            <CircularLoading height="10vh" style={{ flexDirection: 'column' }}>
              <div>Please wait while we are fetching repositories</div>
            </CircularLoading>
          ) : forkState!.error ? (
            <div>Unexpected Error</div>
          ) : (
            forkState!.projects.map((project, index) => (
              <MenuItem
                key={project.id}
                value={index}
                style={{ width: '100%' }}
              >
                <Checkbox checked={forkedRepo.indexOf(index) > -1} />
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
    </div>
  );
};

export default Fork;
