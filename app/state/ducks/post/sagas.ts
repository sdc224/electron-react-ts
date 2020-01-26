import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import apiCaller from '@stateUtils/apiCaller';
import { MetaAction } from '../ActionHelper';
import { fetchPostsError, fetchPostsSuccess } from './actions';
import { IPostRaw, PostActionTypes } from './types';

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: MetaAction): Generator {
  try {
    if (action.meta) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: IPostRaw[] | any = yield call(
        apiCaller,
        action.meta.method,
        action.meta.method
      );

      yield put(fetchPostsSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchPostsError(err.stack!));
    } else {
      yield put(fetchPostsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(PostActionTypes.FETCH_POSTS, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* postSaga() {
  yield all([fork(watchFetchRequest)]);
}
