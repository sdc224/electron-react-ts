import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import GitlabCommon from '@commands/lib/gitlab/common';
import RepositoryHelper from '@commands/lib/repository/repositories';
import { getAllProjectsSuccess, getAllProjectsError } from './actions';
import { ProjectActionTypes } from './types';
import { openSnackbar } from '../snackbar/actions';
import { ISettingsState, ISettingsAwareState } from '../settings/types';

const getSettings = (state: ISettingsAwareState) => state.settings;

/**
 * @desc Business logic of effect.
 */
function* handleAllProjectsFetch(
  action: PayloadAction<string, any>
): Generator {
  try {
    const { path } = (yield select(getSettings)) as ISettingsState;

    // const clonedProjects = getDirectoryNames(path);
    const { gitlab } = new GitlabCommon();
    yield call(gitlab.init);
    const { projects, pagination } = (yield call(
      new RepositoryHelper(gitlab, path).getAllProjects,
      action.payload
    ) as unknown) as RepositoryProjectAndPagination;
    yield put(getAllProjectsSuccess(projects, pagination));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getAllProjectsError(err.stack!));
    } else {
      yield put(getAllProjectsError('An unknown error occured.'));
    }

    yield put(
      openSnackbar({ kind: 'Gitlab', text: err.message!, variant: 'error' })
    );
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchAllProjectsRequest(): Generator {
  yield takeEvery(
    ProjectActionTypes.FETCH_ALL_PROJECTS_START,
    handleAllProjectsFetch
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* postSaga() {
  yield all([fork(watchFetchAllProjectsRequest)]);
}
