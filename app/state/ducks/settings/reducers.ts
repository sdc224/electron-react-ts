import { resolve } from 'path';
import { PayloadAction, Action, TypeConstant } from 'typesafe-actions';
import { SettingsActionTypes, ISettingsState } from './types';

const initialState: ISettingsState = {
  path: resolve('D:/AutonomousSoftware/git-repo')
};

interface IPath {
  path: string;
}

// eslint-disable-next-line import/prefer-default-export
export const settingsReducer = (
  state = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, string> & IPath
): ISettingsState => {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_PROJECTS_PATH:
      return { ...state, path: action.path };

    default:
      return state;
  }
};
