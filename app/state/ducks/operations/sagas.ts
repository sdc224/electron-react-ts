import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { PayloadAction, TypeConstant } from 'typesafe-actions';
import { openFolderSystemDialog } from '@app/electronFunctions';
import Git from '@commands/lib/git';
import GitlabCommon from '@commands/lib/gitlab/common';
import RepositoryHelper from '@commands/lib/repository/repositories';
import { IForkUpdateOptions } from '@commands/models/forkUpdate';
import { isObjectEmpty } from '@utils/objectHelper';
import CloningRepositoriesStore from '@stateUtils/classes/cloning';
import ForkingRepositoriesStore from '@stateUtils/classes/forking';
import ForkUpdateRepositoriesStore from '@stateUtils/classes/forkUpdating';
import {
  fetchClonableProjectsError,
  fetchClonableProjectsSuccess,
  fetchForkableProjectsSuccess,
  fetchForkableProjectsError,
  toggleCloneProgress,
  toggleForkProgress,
  toggleForkUpdateProgress
} from './actions';
import {
  CloneActionTypes,
  ForkActionTypes,
  ForkUpdateActionTypes
} from './types';
import { openSnackbar } from '../snackbar/actions';
import { IProgressBarSelector } from '../progress/types';
import { ISettingsState, ISettingsAwareState } from '../settings/types';

const getSettings = (state: ISettingsAwareState) => state.settings;

/**
 * @desc Business logic of effect.
 */
function* handleCloneProjectsFetch(): Generator {
  try {
    const { path } = (yield select(getSettings)) as ISettingsState;
    const { gitlab } = new GitlabCommon();
    yield call(gitlab.init);
    const { projects } = (yield call(
      new RepositoryHelper(gitlab, path).getCloneableProjects
    ) as unknown) as RepositoryProjectAndPagination;

    yield put(fetchClonableProjectsSuccess(projects));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchClonableProjectsError(err.stack!));
      yield put(
        openSnackbar({ kind: 'Gitlab', text: err.message!, variant: 'error' })
      );
    } else {
      yield put(fetchClonableProjectsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchCloneProjectsRequest(): Generator {
  yield takeLatest(
    CloneActionTypes.FETCH_CLONABLE_PROJECTS,
    handleCloneProjectsFetch
  );
}

function* handleCloning(
  action: PayloadAction<
    TypeConstant,
    { projects: IRepository[]; progressState: IProgressBarSelector }
  >
): Generator {
  try {
    if (
      !action.payload ||
      action.payload.projects.length === 0 ||
      !action.payload.progressState
    )
      return;

    const { path } = (yield select(getSettings)) as ISettingsState;

    const folder = (yield call(
      openFolderSystemDialog,
      undefined,
      path
    )) as Electron.OpenDialogReturnValue;

    if (folder.canceled) return;

    try {
      // TODO : Repo Path Delete
      const git = new Git();
      // TODO : Uncomment whenever Dugite works without Git
      // await git.init();
      yield put(
        action.payload.progressState.progressStart({
          progressType: 'linear',
          variant: 'determinate'
        })
      );
      // if (action.payload.projects[0].hasDotGitFolder) {
      //   TODO Dialog
      // }
      yield put(toggleCloneProgress());
      const cloneProgress = new CloningRepositoriesStore(
        git,
        action.payload.progressState
      );
      const val = (yield call(
        cloneProgress.clone,
        action.payload.projects[0].ssh_url_to_repo,
        folder.filePaths[0],
        {}
      )) as boolean;
      if (val) {
        yield put(
          action.payload.progressState.handleProgress({
            title: 'Cloning Completed',
            value: 0.8
          })
        );

        // Adding necessary Remotes
        yield call(
          git.addRemote,
          action.payload.projects[0],
          action.payload.projects[0].remote.central!.name,
          action.payload.projects[0].remote.central!.url
        );

        yield put(
          action.payload.progressState.handleProgress({
            title: 'Remotes Added',
            value: 1
          })
        );

        yield put(
          openSnackbar({
            kind: 'Clone',
            text: 'Cloning Successfully Completed',
            variant: 'success'
          })
        );
      } else
        yield put(
          action.payload.progressState.handleProgress({
            title: 'Cloning Failed',
            value: 0
          })
        );
    } catch (error) {
      // TODO : change progress bar color to red
      yield put(
        openSnackbar({
          kind: 'Clone',
          text: error.message.toString(),
          variant: 'error'
        })
      );
    } finally {
      yield put(action.payload.progressState.progressComplete());
      yield delay(2000);
      yield put(toggleCloneProgress());
    }
  } catch (err) {
    throw new Error(`Cloning failed${err}`);
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchCloning(): Generator {
  yield takeLatest(CloneActionTypes.START_CLONING, handleCloning);
}

/**
 * @desc Business logic of effect.
 */
function* handleForkProjectsFetch(): Generator {
  try {
    const { path } = (yield select(getSettings)) as ISettingsState;
    // TODO Introduce Design Pattern
    // TODO : Caching
    const { gitlab } = new GitlabCommon();
    yield call(gitlab.init);
    const { projects } = (yield call(
      new RepositoryHelper(gitlab, path).getForkableProjects
    ) as unknown) as RepositoryProjectAndPagination;
    yield put(fetchForkableProjectsSuccess(projects));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchForkableProjectsError(err.stack!));
      yield put(
        openSnackbar({ kind: 'Gitlab', text: err.message!, variant: 'error' })
      );
    } else {
      yield put(fetchForkableProjectsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchForkProjectsRequest(): Generator {
  yield takeLatest(
    ForkActionTypes.FETCH_FORKABLE_PROJECTS,
    handleForkProjectsFetch
  );
}

function* handleForking(
  action: PayloadAction<
    TypeConstant,
    { projects: IRepository[]; progressState: IProgressBarSelector }
  >
): Generator {
  try {
    if (
      !action.payload ||
      action.payload.projects.length === 0 ||
      !action.payload.progressState
    )
      return;

    try {
      yield put(toggleForkProgress());
      yield put(
        action.payload.progressState.progressStart({
          progressType: 'circular',
          variant: 'indeterminate'
        })
      );

      const { gitlab } = new GitlabCommon();
      yield call(gitlab.init);

      const forkProgress = new ForkingRepositoriesStore(
        gitlab,
        action.payload.progressState
      );
      const val = (yield call(
        forkProgress.fork,
        action.payload.projects[0]
      )) as object;
      if (!isObjectEmpty(val)) {
        yield put(
          action.payload.progressState.handleProgress({
            title: 'Forking Completed',
            value: 1
          })
        );
        yield put(
          openSnackbar({
            kind: 'Fork',
            text: 'Forking Successfully Completed',
            variant: 'success'
          })
        );
      }
    } catch (error) {
      // TODO : change progress bar color to red
      yield put(
        openSnackbar({
          kind: 'Fork',
          text: `Forking Failed: ${error.message.toString()}`,
          variant: 'error'
        })
      );
    } finally {
      yield put(action.payload.progressState.progressComplete());
      yield delay(2000);
      yield put(toggleForkProgress());
    }
  } catch (err) {
    throw new Error(`Forking failed${err}`);
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchForking(): Generator {
  yield takeLatest(ForkActionTypes.START_FORKING, handleForking);
}

function* handleForkUpdating(
  action: PayloadAction<
    TypeConstant,
    {
      projects: IRepository[];
      options: IForkUpdateOptions;
      progressState: IProgressBarSelector;
    }
  >
): Generator {
  try {
    if (
      !action.payload ||
      action.payload.projects.length === 0 ||
      !action.payload.progressState
    )
      return;

    try {
      yield put(toggleForkUpdateProgress());
      yield put(
        action.payload.progressState.progressStart({
          progressType: 'linear',
          variant: 'determinate'
        })
      );

      const git = new Git();

      const forkUpdateProgress = new ForkUpdateRepositoriesStore(
        git,
        action.payload.progressState
      );

      const value = (yield call(
        forkUpdateProgress.forkUpdate,
        action.payload.projects[0],
        action.payload.options
      )) as boolean;

      if (value) {
        yield put(
          action.payload.progressState.handleProgress({
            title: 'Fork Updating Completed',
            value: 1
          })
        );
        yield put(
          openSnackbar({
            kind: 'ForkUpdate',
            text: 'Fork Updating Successfully Completed',
            variant: 'success'
          })
        );
      }
    } catch (error) {
      // TODO : change progress bar color to red
      yield put(
        openSnackbar({
          kind: 'ForkUpdate',
          text: `Fork Updating Failed: ${error.message.toString()}`,
          variant: 'error'
        })
      );
    } finally {
      yield put(action.payload.progressState.progressComplete());
      yield delay(2000);
      yield put(toggleForkUpdateProgress());
    }
  } catch (err) {
    throw new Error(`Fork Updating failed${err}`);
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchForkUpdating(): Generator {
  yield takeLatest(
    ForkUpdateActionTypes.START_FORK_UPDATING,
    handleForkUpdating
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* postSaga() {
  yield all([
    fork(watchFetchCloneProjectsRequest),
    fork(watchFetchForkProjectsRequest),
    fork(watchCloning),
    fork(watchForking),
    fork(watchForkUpdating)
  ]);
}
