import { Action } from 'redux';
import Welcome from '@components/Welcome';
import { OperationActionTypes, IOperationState } from './types';

const initialState: IOperationState = {
  title: 'Welcome',
  children: Welcome
};

// eslint-disable-next-line import/prefer-default-export
export function operationReducer(
  state = initialState,
  action: Action<string>
): IOperationState {
  switch (action.type) {
    case OperationActionTypes.CLONE_OPERATION:
      return { ...state, title: 'Clone', children: Welcome };
    case OperationActionTypes.FORK_OPERATION:
      return state;
    default:
      return state;
  }
}
