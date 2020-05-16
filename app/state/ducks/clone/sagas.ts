import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ProjectSchema } from 'gitlab';
import { getAllProjects } from '@stateUtils/gitlabHelper';
import { fetchAllProjectsError, fetchAllProjectsSuccess } from './actions';
import { CloneActionTypes } from './types';

/**
 * @desc Business logic of effect.
 */
function* handleFetch(): Generator {
  try {
    const res: ProjectSchema[] | any = yield call(getAllProjects);
    yield put(fetchAllProjectsSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchAllProjectsError(err.stack!));
    } else {
      yield put(fetchAllProjectsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(CloneActionTypes.FETCH_ALL_PROJECTS, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* postSaga() {
  yield all([fork(watchFetchRequest)]);
}
