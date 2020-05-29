export const GitOperationTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export type GitNamespace = 'remote' | 'checkout';

export interface IGitOperation {
  loading: boolean;
  success: unknown;
  error: string;
}

export interface IGitOperationWithNamespaceState {
  // clone: IGitOperation;
  remote: IGitOperation;
  checkout: IGitOperation;
}

export interface IGitOperationAwareState {
  gitOperation: IGitOperationWithNamespaceState;
}
