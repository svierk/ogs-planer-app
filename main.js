const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let win;

function onReady() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/ogs-planer-app/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // include following line to open the chrome dev tools on app start
  win.webContents.openDevTools();
}

app.on('ready', onReady);

// ##### CHILDREN DB ACTIONS ####

ipcMain.on('getAllChildren', () => {
  const children = require(path.join(__dirname, 'dist/ogs-planer-app/assets/models/children'));
  win.webContents.send('getAllChildren', children.getAllChildren());
});

ipcMain.on('addChild', () => {
  const children = require(path.join(__dirname, 'dist/ogs-planer-app/assets/models/children'));
  children.addChild('Test', 'Child');
});
