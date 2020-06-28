import { ipcRenderer } from 'electron';

export const getAppPath = async () =>
  (await ipcRenderer.invoke('appPath')) as string;

export const minimizeWindow = () => {
  ipcRenderer.invoke('minimize-window');
};

export const maximizeWindow = () => {
  ipcRenderer.invoke('maximize-window');
};

export const unMaximizeWindow = () => {
  ipcRenderer.invoke('unmaximize-window');
};

export const closeWindow = () => {
  ipcRenderer.invoke('close-window');
};

export const isMaximized = (): Promise<boolean> => {
  return ipcRenderer.invoke('is-maximized-window');
};

export const openFolderSystemDialog = async (
  title?: string,
  defaultPath?: string
) => {
  return ipcRenderer.invoke('showOpenDialog', {
    title,
    defaultPath,
    properties: ['openDirectory']
  });
};
