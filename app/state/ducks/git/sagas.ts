import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction, TypeConstant } from 'typesafe-actions';
import Git from '@commands/lib/git';
import RepositoryHelper from '@commands/lib/repository/repositories';
import { GitOperationTypes } from './types';
import { success as successAction, error as errorAction } from './actions';

function* fetchRemotes(
  action: PayloadAction<TypeConstant, IRepository>
): Generator {
  try {
    const git = new Git();

    const repositoryHelper = new RepositoryHelper();
    yield call(repositoryHelper.addExtraRemotes, git, action.payload.id);

    yield put(successAction('remote', action.payload.id, true));
  } catch (error) {
    yield put(errorAction('remote', action.payload.id, error));
  }
}

/**
 * @desc Watches latest specified action and runs effect method and passes action args to it
 */
function* watchFetchRemotes(): Generator {
  yield takeLatest(`@@remote/${GitOperationTypes.LOADING}`, fetchRemotes);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* gitSaga() {
  yield all([fork(watchFetchRemotes)]);
}
