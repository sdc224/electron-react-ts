import { remote, BrowserWindow } from 'electron';

let browserWindow: BrowserWindow | null = null;

const initialize = () => {
  browserWindow = remote.getCurrentWindow();
};

export const getAppPath = () => remote.app.getAppPath();

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

export const openFolderSystemDialog = (
  title?: string,
  defaultPath?: string
) => {
  if (!browserWindow) initialize();
  return remote.dialog.showOpenDialog(browserWindow!, {
    title,
    defaultPath,
    properties: ['openDirectory']
  });
};
