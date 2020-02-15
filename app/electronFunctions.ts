import { remote, BrowserWindow } from 'electron';

let browserWindow: BrowserWindow | null = null;

const initialize = () => {
  browserWindow = remote.getCurrentWindow();
};

export const minimizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.minimize();
};

export const maximizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.maximize();
};

export const unMaximizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.unmaximize();
};

export const closeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.close();
};

export const isMaximized = (): boolean => {
  if (!browserWindow) initialize();

  return !!browserWindow?.isMaximized();
};

export const openFolderSystemDialog = () => {
  return remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
};
