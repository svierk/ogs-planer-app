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

// ##### CLASSES DB ACTIONS #####

ipcMain.on('getClasses', () => {
  const classes = require(path.join(__dirname, `${basePath}/classes`));
  win.webContents.send('getClasses', classes.getClasses());
});

ipcMain.on('createClass', (event, classItem) => {
  const classes = require(path.join(__dirname, `${basePath}/classes`));
  classes.createClass(classItem);
});

ipcMain.on('updateClass', (event, classItem) => {
  const classes = require(path.join(__dirname, `${basePath}/classes`));
  classes.updateClass(classItem);
});

ipcMain.on('deleteClass', (event, id) => {
  const classes = require(path.join(__dirname, `${basePath}/classes`));
  classes.deleteClass(id);
});

// ##### COURSES DB ACTIONS #####

ipcMain.on('getCourses', () => {
  const courses = require(path.join(__dirname, `${basePath}/courses`));
  win.webContents.send('getCourses', courses.getCourses());
});

ipcMain.on('createCourse', (event, course) => {
  const courses = require(path.join(__dirname, `${basePath}/courses`));
  courses.createCourse(course);
});

ipcMain.on('updateCourse', (event, course) => {
  const courses = require(path.join(__dirname, `${basePath}/courses`));
  courses.updateCourse(course);
});

ipcMain.on('deleteCourse', (event, id) => {
  const courses = require(path.join(__dirname, `${basePath}/courses`));
  courses.deleteCourse(id);
});
