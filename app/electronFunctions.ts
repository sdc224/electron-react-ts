import { remote, BrowserWindow } from 'electron';

let browserWindow: BrowserWindow | null = null;

const initialize = () => {
  browserWindow = remote.getCurrentWindow();
};

const minimizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.minimize();
};

const maximizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.maximize();
};

const unMaximizeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.unmaximize();
};

const closeWindow = () => {
  if (!browserWindow) initialize();

  browserWindow?.close();
};

const isMaximized = (): boolean => {
  if (!browserWindow) initialize();

  return !!browserWindow?.isMaximized();
};

export {
  minimizeWindow,
  maximizeWindow,
  unMaximizeWindow,
  closeWindow,
  isMaximized
};
