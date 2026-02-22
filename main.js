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

// ##### CLASS SCHEDULE DB ACTIONS #####

ipcMain.on('getClassSchedules', () => {
  const classSchedule = require(path.join(__dirname, `${basePath}/class-schedule`));
  win.webContents.send('getClassSchedules', classSchedule.getClassSchedules());
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

// ##### EARLY CARE DB ACTIONS #####

ipcMain.on('getEarlyCare', () => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  win.webContents.send('getEarlyCare', earlyCare.getEarlyCare());
});

ipcMain.on('createEarlyCare', (event, items) => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  earlyCare.createEarlyCare(items);
});

ipcMain.on('updateEarlyCare', (event, items) => {
  const earlyCare = require(path.join(__dirname, `${basePath}/early-care`));
  earlyCare.updateEarlyCare(items);
});

// ##### LUNCH DB ACTIONS #####

ipcMain.on('getLunch', () => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  win.webContents.send('getLunch', lunch.getLunch());
});

ipcMain.on('createLunch', (event, items) => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  lunch.createLunch(items);
});

ipcMain.on('updateLunch', (event, items) => {
  const lunch = require(path.join(__dirname, `${basePath}/lunch`));
  lunch.updateLunch(items);
});

// ##### HOMEWORK DB ACTIONS #####

ipcMain.on('getHomework', () => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  win.webContents.send('getHomework', homework.getHomework());
});

ipcMain.on('createHomework', (event, items) => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  homework.createHomework(items);
});

ipcMain.on('updateHomework', (event, items) => {
  const homework = require(path.join(__dirname, `${basePath}/homework`));
  homework.updateHomework(items);
});

// ##### CHILD COURSES DB ACTIONS #####

ipcMain.on('getChildCourses', () => {
  const childCourse = require(path.join(__dirname, `${basePath}/child-courses`));
  win.webContents.send('getChildCourses', childCourse.getChildCourses());
});

ipcMain.on('createChildCourses', (event, courses) => {
  const childCourses = require(path.join(__dirname, `${basePath}/child-courses`));
  childCourses.createChildCourses(courses);
});

ipcMain.on('updateChildCourses', (event, courses) => {
  const childCourses = require(path.join(__dirname, `${basePath}/child-courses`));
  childCourses.updateChildCourses(courses);
});

// ##### PICKUP DB ACTIONS #####

ipcMain.on('getPickup', () => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  win.webContents.send('getPickup', pickup.getPickup());
});

ipcMain.on('createPickup', (event, items) => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  pickup.createPickup(items);
});

ipcMain.on('updatePickup', (event, items) => {
  const pickup = require(path.join(__dirname, `${basePath}/pickup`));
  pickup.updatePickup(items);
});
