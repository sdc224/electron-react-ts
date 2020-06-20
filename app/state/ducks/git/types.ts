export const GitOperationTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export type GitNamespace = 'remote' | 'checkout' | 'branch' | 'fetch';

export interface IGitOperation {
  loading: boolean;
  success: unknown;
  error: string;
}

export interface IGitOperationWithNamespaceState {
  // clone: IGitOperation;
  remote: IGitOperation;
  checkout: IGitOperation;
  branch: IGitOperation;
  fetch: IGitOperation;
}

export interface IGitOperationAwareState {
  gitOperation: IGitOperationWithNamespaceState;
}
