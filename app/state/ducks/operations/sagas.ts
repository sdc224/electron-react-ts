import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import { ProjectSchema } from 'gitlab';
import { PayloadAction, TypeConstant } from 'typesafe-actions';
import Git from '@commands/lib/git';
import GitlabEnterprise from '@commands/lib/gitlab/enterprise';
import { openFolderSystemDialog } from '@app/electronFunctions';
import { isObjectEmpty } from '@utils/objectHelper';
import {
  fetchClonableProjectsError,
  fetchClonableProjectsSuccess,
  fetchForkableProjectsSuccess,
  fetchForkableProjectsError,
  toggleCloneProgress,
  toggleForkProgress
} from './actions';
import { CloneActionTypes, ForkActionTypes } from './types';
import { openSnackbar } from '../snackbar/actions';
import CloningRepositoriesStore from './cloning';
import { IProgressBarSelector } from '../progress/types';
import ForkingRepositoriesStore from './forking';

/**
 * @desc Business logic of effect.
 */
function* handleCloneProjectsFetch(): Generator {
  try {
    // TODO Introduce Design Pattern
    const gitlab = new GitlabEnterprise();
    yield call(gitlab.init);
    const res: ProjectSchema[] | any = yield call(gitlab.getClonableProjects);
    yield put(fetchClonableProjectsSuccess(res));
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
  yield takeEvery(
    CloneActionTypes.FETCH_CLONABLE_PROJECTS,
    handleCloneProjectsFetch
  );
}

function* handleCloning(
  action: PayloadAction<
    TypeConstant,
    { projects: ProjectSchema[]; progressState: IProgressBarSelector }
  >
): Generator {
  try {
    if (
      !action.payload ||
      action.payload.projects.length === 0 ||
      !action.payload.progressState
    )
      return;

    const folder = (yield call(
      openFolderSystemDialog
    )) as Electron.OpenDialogReturnValue;

    if (folder.canceled) return;

    try {
      // TODO : Repo Path Delete
      const test = new Git();
      // TODO : Uncomment whenever Dugite works without Git
      // await test.init();
      yield put(
        action.payload.progressState.progressStart({
          progressType: 'linear',
          variant: 'determinate'
        })
      );
      yield put(toggleCloneProgress());
      const cloneProgress = new CloningRepositoriesStore(
        test,
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
  yield takeEvery(CloneActionTypes.START_CLONING, handleCloning);
}

/**
 * @desc Business logic of effect.
 */
function* handleForkProjectsFetch(): Generator {
  try {
    // TODO Introduce Design Pattern
    const gitlab = new GitlabEnterprise();
    yield call(gitlab.init);
    const res: ProjectSchema[] | any = yield call(gitlab.getForkableProjects);
    yield put(fetchForkableProjectsSuccess(res));
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
  yield takeEvery(
    ForkActionTypes.FETCH_FORKABLE_PROJECTS,
    handleForkProjectsFetch
  );
}

function* handleForking(
  action: PayloadAction<
    TypeConstant,
    { projects: ProjectSchema[]; progressState: IProgressBarSelector }
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

      const gitlab = new GitlabEnterprise();
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
  yield takeEvery(ForkActionTypes.START_FORKING, handleForking);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* postSaga() {
  yield all([
    fork(watchFetchCloneProjectsRequest),
    fork(watchFetchForkProjectsRequest),
    fork(watchCloning),
    fork(watchForking)
  ]);
}
