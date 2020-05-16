export const SettingsActionTypes = {
  CHANGE_PROJECTS_PATH: 'CHANGE_PROJECTS_PATH'
};

export interface ISettingsState {
  path: string;
}

export interface ISettingsAwareState {
  settings: ISettingsState;
}
