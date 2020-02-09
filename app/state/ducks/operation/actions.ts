import { action } from 'typesafe-actions';
import { OperationActionTypes } from './types';

export const clone = () => action(OperationActionTypes.CLONE_OPERATION);
export const fork = () => action(OperationActionTypes.FORK_OPERATION);
export const update = () => action(OperationActionTypes.UPDATE_OPERATION);
export const createMergeRequest = () =>
  action(OperationActionTypes.CREATE_MERGE_REQUEST_OPERATION);
export const featureBranch = () =>
  action(OperationActionTypes.FEATURE_BRANCH_OPERATION);
