import React from 'react';
import {
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Button,
  ThemeProvider
} from '@material-ui/core';
import { useGit } from '@ducks/git/selectors';
import theme from '@componentsTSStyles/forkUpdateDialogStyles';
import CustomDialog from './CustomDialog';
import CircularLoading from './CircularLoading';
import CustomForm from './CustomForm';

interface IForkUpdateProps {
  open: boolean;
  project: IRepository;
  handleClose(): void;
}

const ForkUpdateDialog: React.FC<IForkUpdateProps> = ({
  open,
  project,
  handleClose
}: IForkUpdateProps) => {
  const [remoteState, setRemoteState] = React.useState<string>('');

  const { gitOperationState, start: fetchRemote } = useGit('remote');

  React.useEffect(() => {
    if (project) fetchRemote(project);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRemoteState(event.target.value as string);
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
      content={
        <CustomForm formVariant="filled" hasButtons={false}>
          <InputLabel id="select-remote-label">Select Remote</InputLabel>
          <Select
            labelId="select-remote-label"
            id="select-remote"
            value={remoteState}
            onChange={handleChange}
          >
            {/* Need to disable the nested ternary for Select issue */}
            {/* Github Issue: https://github.com/mui-org/material-ui/issues/14943 */}
            {/* Github Issue: https://github.com/mui-org/material-ui/issues/16181 */}
            {/* eslint-disable-next-line no-nested-ternary */}
            {gitOperationState!.loading ? (
              <CircularLoading
                height="10vh"
                style={{ flexDirection: 'column' }}
              >
                <div>Please wait while we are fetching remotes</div>
              </CircularLoading>
            ) : gitOperationState!.error ? (
              <div>Unexpected Error</div>
            ) : (
              (gitOperationState?.success as boolean) &&
              [
                ...Object.values(project.remote)!,
                ...project.extraRemotes!
              ]?.map((remote: IRemote) => (
                <MenuItem
                  key={remote.url}
                  value={remote.name}
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
              ))
            )}
          </Select>
        </CustomForm>
      }
      actions={
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            disabled={remoteState === ''}
          >
            Fork Update
          </Button>
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
