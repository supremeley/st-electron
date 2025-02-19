const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let win;
function create() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.webContents.openDevTools();
  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'));
  }
}

function send(channel, ...args) {
  win.webContents.send(channel, ...args);
}

module.exports = { create, send };
