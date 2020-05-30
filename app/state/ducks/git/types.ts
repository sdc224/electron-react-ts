export const GitOperationTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export type GitNamespace = 'remote' | 'checkout' | 'branch';

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
}

export interface IGitOperationAwareState {
  gitOperation: IGitOperationWithNamespaceState;
}
