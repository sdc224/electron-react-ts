import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import GitlabEnterprise from '@commands/lib/gitlab/enterprise';
import { getAllProjectsSuccess, getAllProjectsError } from './actions';
import { ProjectActionTypes, GitlabProjectSchema } from './types';
import { openSnackbar } from '../snackbar/actions';

/**
 * @desc Business logic of effect.
 */
function* handleAllProjectsFetch(): Generator {
  try {
    // TODO Introduce Design Pattern
    const gitlab = new GitlabEnterprise();
    yield call(gitlab.init);
    const res: GitlabProjectSchema[] | any = yield call(gitlab.getAllProjects);
    yield put(getAllProjectsSuccess(res));
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
