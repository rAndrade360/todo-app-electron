'use strict';
import {BrowserWindow} from 'electron';
import * as path from 'path';

const defaultProps = {
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js"),
  },
  width: 800,
};

interface Config {
  file: string,
  parent?: BrowserWindow,
  height?: number,
  width?: number 
}

function Window({file, ...windowSettings}: Config) {
    const mainWindow = new BrowserWindow({...defaultProps, ...windowSettings});
    mainWindow.loadFile(file)
    mainWindow.webContents.openDevTools();
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
    return mainWindow;
}

export default Window;