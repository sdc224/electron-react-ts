import { combineReducers } from 'redux';
import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';
import { ErrorAction } from '../ActionHelper';
import {
  IGitOperation,
  GitNamespace,
  GitOperationTypes,
  IGitOperationWithNamespaceState
} from './types';

const initialState: IGitOperation = {
  loading: false,
  success: undefined,
  error: ''
};

export const gitReducer = (namespace: GitNamespace) => (
  state = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any> & ErrorAction
): IGitOperation => {
  switch (action.type) {
    case `@@${namespace}/${GitOperationTypes.LOADING}`:
      return { ...state, loading: true };

    case `@@${namespace}/${GitOperationTypes.SUCCESS}`:
      return {
        ...state,
        loading: false,
        error: '',
        success: action.payload
      };

    case `@@${namespace}/${GitOperationTypes.ERROR}`:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export const gitRootReducer = combineReducers<IGitOperationWithNamespaceState>({
  // clone: gitReducer('clone'),
  remote: gitReducer('remote'),
  checkout: gitReducer('checkout')
});
