/* eslint-disable no-console */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import {
  app,
  BrowserWindow,
  dialog,
  shell,
  ipcMain,
  OpenDialogOptions
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  import('source-map-support')
    .then((sourceMapSupport) => sourceMapSupport.install())
    .catch((error) => console.error(error));
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  import('electron-debug')
    .then((electronDebug) => electronDebug.default())
    .catch((error) => console.error(error));
}

const installExtensions = async () => {
  try {
    const installer = await import('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [
      installer.REACT_DEVELOPER_TOOLS,
      installer.REDUX_DEVTOOLS
    ];

    return Promise.all(
      extensions.map((extension) => installer.default(extension, forceDownload))
    ).catch(
      (error) => new Error(`Error while installing extensions\n${error}`)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    try {
      await installExtensions();
    } catch (error) {
      console.error('Extension Installation Failed');
    }
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    frame: false,
    webPreferences: {
      // Electron Security warning due to this line
      // Avoid: https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
      // Workaround: https://stackoverflow.com/questions/52236641/electron-ipc-and-nodeintegration/57656281#57656281
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Force external links from browser-window to open in a default browser from Electron
  // https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
  mainWindow.webContents.on('new-window', async (e, url) => {
    e.preventDefault();

    // TODO : Remember option with checkbox
    const result = await dialog.showMessageBox(mainWindow!, {
      title: 'Gittian',
      message: 'Do you want Gittian to open external website',
      defaultId: 1,
      detail: url,
      type: 'info',
      buttons: ['Cancel', 'OK']
    });

    if (result.response === 1) shell.openExternal(url);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.handle('minimize-window', () => {
  if (!mainWindow) return;

  mainWindow.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (!mainWindow) return;

  mainWindow.maximize();
});

ipcMain.handle('unmaximize-window', () => {
  if (!mainWindow) return;

  mainWindow.unmaximize();
});

ipcMain.handle('close-window', () => {
  if (!mainWindow) return;

  mainWindow.close();
});

ipcMain.handle('is-maximized-window', () => {
  if (!mainWindow) return null;

  return mainWindow.isMaximized();
});

ipcMain.handle('appPath', () => app.getAppPath());

ipcMain.handle(
  'showOpenDialog',
  (_event, openDialogOptions: OpenDialogOptions) => {
    dialog.showOpenDialog(mainWindow!, openDialogOptions);
  }
);
