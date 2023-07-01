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

// ##### EARYL CARE DB ACTIONS #####

ipcMain.on('getEarlyCare', () => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  win.webContents.send('getEarlyCare', earlyCare.getEarlyCare());
});

ipcMain.on('createEarlyCare', (event, item) => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  earlyCare.createEarlyCare(item);
});

ipcMain.on('updateEarlyCare', (event, item) => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  earlyCare.updateEarlyCare(item);
});

ipcMain.on('deleteEarlyCare', (event, id) => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  earlyCare.deleteEarlyCare(id);
});

// ##### LUNCH DB ACTIONS #####

ipcMain.on('getLunch', () => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  win.webContents.send('getLunch', lunch.getLunch());
});

ipcMain.on('createLunch', (event, item) => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  lunch.createLunch(item);
});

ipcMain.on('updateLunch', (event, item) => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  lunch.updateLunch(item);
});

ipcMain.on('deleteLunch', (event, id) => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  lunch.deleteLunch(id);
});

// ##### HOMEWORK DB ACTIONS #####

ipcMain.on('getHomework', () => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  win.webContents.send('getHomework', homework.getHomework());
});

ipcMain.on('createHomework', (event, item) => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  homework.createHomework(item);
});

ipcMain.on('updateHomework', (event, item) => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  homework.updateHomework(item);
});

ipcMain.on('deleteHomework', (event, id) => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  homework.deleteHomework(id);
});

// ##### CHILD COURSES DB ACTIONS #####

ipcMain.on('getChildCourses', () => {
  const childCourse = require(path.join(__dirname, `${basePath}/child-courses`));
  win.webContents.send('getChildCourses', childCourse.getChildCourses());
});

ipcMain.on('createChildCourse', (event, item) => {
  const childCourse = require(path.join(__dirname, `${basePath}/child-courses`));
  childCourse.createChildCourse(item);
});

ipcMain.on('updateChildCourse', (event, item) => {
  const childCourse = require(path.join(__dirname, `${basePath}/child-courses`));
  childCourse.updateChildCourse(item);
});

ipcMain.on('deleteChildCourse', (event, id) => {
  const childCourse = require(path.join(__dirname, `${basePath}/child-courses`));
  childCourse.deleteChildCourse(id);
});

// ##### PICKUP DB ACTIONS #####

ipcMain.on('getPickup', () => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  win.webContents.send('getPickup', pickup.getPickup());
});

ipcMain.on('createPickup', (event, item) => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  pickup.createPickup(item);
});

ipcMain.on('updatePickup', (event, item) => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  pickup.updatePickup(item);
});

ipcMain.on('deletePickup', (event, id) => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  pickup.deletePickup(id);
});
