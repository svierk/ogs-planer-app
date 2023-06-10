const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const basePath = 'dist/ogs-planer-app/assets/models';

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
  // win.webContents.openDevTools();
}

app.on('ready', onReady);

// ##### CHILDREN DB ACTIONS #####

ipcMain.on('getChildren', () => {
  const children = require(path.join(__dirname, `${basePath}/children`));
  win.webContents.send('getChildren', children.getChildren());
});

ipcMain.on('createChild', (event, child) => {
  const children = require(path.join(__dirname, `${basePath}/children`));
  children.createChild(child);
});

ipcMain.on('updateChild', (event, child) => {
  const children = require(path.join(__dirname, `${basePath}/children`));
  children.updateChild(child);
});

ipcMain.on('deleteChild', (event, id) => {
  const children = require(path.join(__dirname, `${basePath}/children`));
  children.deleteChild(id);
});
