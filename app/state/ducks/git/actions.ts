import { action } from 'typesafe-actions';
import { GitNamespace, GitOperationTypes } from './types';

export const start = (namespace: GitNamespace, params: unknown) =>
  action(`@@${namespace}/${GitOperationTypes.LOADING}`, params);

export const success = (namespace: GitNamespace, payload: unknown) =>
  action(`@@${namespace}/${GitOperationTypes.SUCCESS}`, payload);

export const error = (namespace: GitNamespace, message: string) =>
  action(
    `@@${namespace}/${GitOperationTypes.ERROR}`,
    undefined,
    undefined,
    message
  );
