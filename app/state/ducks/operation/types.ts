export const OperationActionTypes = {
  CLONE_OPERATION: '@@operation/CLONE_OPERATION',
  FORK_OPERATION: '@@operation/FORK_OPERATION',
  UPDATE_OPERATION: '@@operation/UPDATE_OPERATION',
  CREATE_MERGE_REQUEST_OPERATION: '@@operation/CREATE_MERGE_REQUEST_OPERATION',
  FEATURE_BRANCH_OPERATION: '@@operation/FEATURE_BRANCH_OPERATION'
};

export interface IOperationState {
  title: string;
  href?: string;
  click?: () => any;
  // component?: React.ReactElement;
  icon: React.ReactElement;
}

export interface IOperationAwareState {
  operation: IOperationState;
}
