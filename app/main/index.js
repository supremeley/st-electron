const { app, BrowserWindow } = require('electron');
const { create: createMainWindow } = require('./windows/main');
const handleIpc = require('./ipc');
const handleReload = require('electron-reload');

app.allowRendererProcessReuse = false;

app.on('ready', () => {
  createMainWindow();
  handleIpc();
  require('./robot.js')();
});

handleReload(__dirname, {
  electron: require(`${__dirname}/../../node_modules/electron`),
});
