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

    yield put(successAction('remote', true));
  } catch (error) {
    yield put(errorAction('remote', error));
  }
}

/**
 * @desc Watches latest specified action and runs effect method and passes action args to it
 */
function* watchFetchRemotes(): Generator {
  yield takeLatest(`@@remote/${GitOperationTypes.LOADING}`, fetchRemotes);
}

function* fetchBranches(
  action: PayloadAction<TypeConstant, IRepository>
): Generator {
  try {
    const git = new Git();
    // const repo = new RepositoryHelper();

    // const remoteBranches = yield call(repo.addBranches, action.payload.id!);

    const branches = yield call(git.getBranches, action.payload);

    yield put(successAction('branch', branches));
  } catch (error) {
    yield put(errorAction('branch', error));
  }
}

/**
 * @desc Watches latest specified action and runs effect method and passes action args to it
 */
function* watchFetchBranches(): Generator {
  yield takeLatest(`@@branch/${GitOperationTypes.LOADING}`, fetchBranches);
}

function* gitFetch(
  action: PayloadAction<
    TypeConstant,
    { repository: IRepository; remote: string }
  >
): Generator {
  try {
    const git = new Git();
    yield call(git.fetch, action.payload.repository, action.payload.remote);
    yield put(successAction('fetch', true));
  } catch (error) {
    yield put(errorAction('fetch', error));
  }
}

/**
 * @desc Watches latest specified action and runs effect method and passes action args to it
 */
function* watchFetch(): Generator {
  yield takeLatest(`@@fetch/${GitOperationTypes.LOADING}`, gitFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* gitSaga() {
  yield all([
    fork(watchFetchRemotes),
    fork(watchFetchBranches),
    fork(watchFetch)
  ]);
}
