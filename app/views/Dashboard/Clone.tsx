/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  Chip
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularLoading from '@components/CircularLoading';
import styles from '@tsStyles/styles/views/cloneStyles';
import { useClone } from '@ducks/clone/selectors';

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
  projects: Array<GitlabProjectSchema>;
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
  const { cloneState, getProjects } = useClone();
  const [clonedRepo, setClonedRepo] = React.useState<number[]>([]);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClonedRepo(event.target.value as number[]);
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
                <MenuItem key={project.id} value={index}>
                  <Checkbox checked={clonedRepo.indexOf(index) > -1} />
                  {project.name}
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
        </FormControl>
      </main>
    </div>
  );
};

export default Clone;
