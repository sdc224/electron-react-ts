import React from 'react';
import {
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Button,
  ThemeProvider
} from '@material-ui/core';
import validate from 'validate.js';
import theme from '@componentsTSStyles/forkUpdateDialogStyles';
import { Branch, BranchType } from '@commands/models/branch';
import { useGit } from '@ducks/git/selectors';
import { useForkUpdate } from '@ducks/operations/selectors';
import { useProgress } from '@ducks/progress/selectors';
import { toTitleCase } from '@utils/stringHelper';
import CustomDialog from './CustomDialog';
import CustomForm from './CustomForm';
import LoadingButton from './LoadingButton';
import InfinityLoading from './InfinityLoading';

const schema = {
  remote: {
    presence: { allowEmpty: false, message: 'is required' },
    type: 'string'
  },
  cloudBranch: {
    presence: { allowEmpty: false, message: 'is required' },
    type: 'string'
  },
  forkBranch: {
    presence: { allowEmpty: false, message: 'is required' },
    type: 'string'
  }
};

interface IValue {
  remote?: string;
  cloudBranch?: string;
  forkBranch?: string;
}

interface IFormState {
  isValid: boolean;
  values: IValue;
  touched: IValue;
  errors: IValue;
}

interface ISelectProps {
  handleChange(event: React.ChangeEvent<{ value: unknown }>): void;
  error?: boolean;
}

interface ISelectRemoteProps extends ISelectProps {
  project: IRepository;
  selectedValue?: string;
}

interface ISelectBranchProps extends ISelectProps {
  type: 'cloud' | 'fork';
  branches: Branch[];
  selectedValue?: string;
}

interface IForkUpdateProps {
  open: boolean;
  project: IRepository;
  handleClose(): void;
}

const SelectRemote = ({
  handleChange,
  project,
  selectedValue,
  error
}: ISelectRemoteProps) => (
  <CustomForm formVariant="filled" hasButtons={false} kind="fork-update">
    <InputLabel id="select-remote-label">Select Remote</InputLabel>
    <Select
      name="remote"
      error={error}
      labelId="select-remote-label"
      id="select-remote"
      value={selectedValue}
      onChange={handleChange}
      defaultValue="central"
    >
      {[...Object.values(project.remote)!, ...project.extraRemotes!]?.map(
        (remote: IRemote) => (
          <MenuItem
            key={remote.url}
            value={`${remote.name}::${remote.url}`}
            style={{ width: '100%' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: `calc(100% - 50px)`
              }}
            >
              <Typography noWrap variant="subtitle2">
                {remote.name}
              </Typography>
              <Typography noWrap variant="caption">
                {remote.url}
              </Typography>
            </div>
          </MenuItem>
        )
      )}
    </Select>
  </CustomForm>
);

const SelectBranch = ({
  branches,
  handleChange,
  selectedValue,
  type,
  error
}: ISelectBranchProps) => (
  <CustomForm formVariant="filled" hasButtons={false} kind="fork-update">
    <InputLabel id={`select-${type}-branch-label`}>
      {`Select ${toTitleCase(type)} Branch`}
    </InputLabel>
    <Select
      error={error}
      name={`${type}Branch`}
      labelId={`select-${type}-branch-label`}
      id={`select-${type}-branch`}
      value={selectedValue}
      onChange={handleChange}
      defaultValue="central"
    >
      {branches?.map((branch: Branch, index: number) => (
        <MenuItem
          key={branch.name}
          value={index.toString()}
          style={{ width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: `calc(100% - 50px)`
            }}
          >
            <Typography noWrap variant="subtitle2">
              {branch.name}
            </Typography>
            <Typography noWrap variant="caption">
              {BranchType[branch.type]}
            </Typography>
          </div>
        </MenuItem>
      ))}
    </Select>
  </CustomForm>
);

const ForkUpdateDialog: React.FC<IForkUpdateProps> = ({
  open,
  project,
  handleClose
}: IForkUpdateProps) => {
  const { gitOperationState: gitRemoteState, start: fetchRemote } = useGit(
    'remote'
  );
  const { gitOperationState: gitBranchState, start: fetchBranches } = useGit(
    'branch'
  );
  const progressState = useProgress();
  const { startForkUpdating } = useForkUpdate();

  const [formState, setFormState] = React.useState<IFormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  React.useEffect(() => {
    if (open && project) {
      fetchRemote(project);
      fetchBranches(project);
    }
  }, [open, project]);

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = (field: keyof IValue) =>
    !!(formState.touched[field] && formState.errors[field]);

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    event.persist();

    setFormState((prevFormState: IFormState) => ({
      ...prevFormState,
      values: {
        ...formState.values,
        [event.target.name!]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name!]: true
      }
    }));
  };

  // TODO : config

  const handleForkUpdate = () => {
    const separatedValues = formState.values.remote?.split('::')!;
    const cloudRemote = {
      name: separatedValues[0],
      url: separatedValues[1]
    } as IRemote;
    const cloudBranch = (gitBranchState.success as Branch[])[
      parseInt(formState.values.cloudBranch!, 10)
    ];
    const forkBranch = (gitBranchState.success as Branch[])[
      parseInt(formState.values.forkBranch!, 10)
    ];

    startForkUpdating(
      [project],
      { cloudRemote, cloudBranch, forkBranch },
      progressState
    );
  };

  const getContentArea = () => {
    if (gitRemoteState.loading || gitBranchState.loading)
      return <InfinityLoading fullHeight />;

    if (gitRemoteState.error || gitBranchState.error)
      return <Typography>An Unexpected Error</Typography>;

    if (gitRemoteState.success && gitRemoteState.success)
      return (
        <div>
          <SelectRemote
            error={hasError('remote')}
            selectedValue={formState.values.remote || ''}
            handleChange={handleChange}
            project={project}
          />
          <SelectBranch
            error={hasError('cloudBranch')}
            branches={gitBranchState.success as Branch[]}
            handleChange={handleChange}
            selectedValue={formState.values.cloudBranch || ''}
            type="cloud"
          />
          <SelectBranch
            error={hasError('forkBranch')}
            branches={gitBranchState.success as Branch[]}
            handleChange={handleChange}
            selectedValue={formState.values.forkBranch || ''}
            type="fork"
          />
        </div>
      );

    return null;
  };

  return (
    <CustomDialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      dividers
      id="fork-update"
      title="Fork Update"
      handleClose={handleClose}
      content={getContentArea()}
      actions={
        <ThemeProvider theme={theme}>
          <LoadingButton
            buttonText="Fork Update"
            kind="fork-update"
            disabled={Boolean(
              gitRemoteState.loading ||
                gitRemoteState.error ||
                gitBranchState.loading ||
                gitBranchState.error ||
                !formState.isValid
            )}
            onClick={handleForkUpdate}
          />
          <Button
            color="secondary"
            variant="outlined"
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
        </ThemeProvider>
      }
    />
  );
};

export default ForkUpdateDialog;
