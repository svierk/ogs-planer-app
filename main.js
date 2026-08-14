const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const basePath = 'dist/ogs-planer-app/browser/assets/models';

// Windows only: the Squirrel installer starts the app with --squirrel-install,
// --squirrel-updated, --squirrel-obsolete or --squirrel-uninstall to let it
// create and remove its shortcuts. Those runs must not open a window - without
// this guard a real app window flashes up during install and uninstall.
if (require('electron-squirrel-startup')) {
  app.quit();
}

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
      pathname: path.join(__dirname, 'dist/ogs-planer-app/browser/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // include following line to open the chrome dev tools on app start
  // win.webContents.openDevTools();
}

// Nothing stops a Windows user from double-clicking the shortcut twice, and a
// second instance would open its own SQLite handle on the same database file.
// Keep one instance and surface the existing window instead.
if (app.requestSingleInstanceLock()) {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });
  app.on('ready', onReady);
} else {
  app.quit();
}

// ##### DATABASE BACKUP #####

// The live database no longer sits inside the app directory (see dbmgr.js), so
// it can't be handed out with a plain <a href="assets/db/..."> link any more -
// that link would have exported the empty seed. Copy the real file instead.
//
// A plain file copy is safe here: the database runs in SQLite's default
// rollback-journal mode, so the .db file is complete between transactions.
ipcMain.on('exportDatabase', (event) => {
  const dbmgr = require(path.join(__dirname, `${basePath}/dbmgr`));
  const target = dialog.showSaveDialogSync(win, {
    title: 'Datenbank exportieren',
    defaultPath: path.join(
      app.getPath('documents'),
      `ogs-planer-datenbank-${new Date().toISOString().slice(0, 10)}.db`
    ),
    filters: [{ name: 'SQLite Datenbank', extensions: ['db'] }],
    properties: ['createDirectory', 'showOverwriteConfirmation'],
  });

  if (!target) {
    event.returnValue = '';
    return;
  }

  fs.copyFileSync(dbmgr.dbPath, target);
  event.returnValue = target;
});

// Counterpart to the export: lets a user move their data onto a new machine, and
// - importantly - recover it after updating from a version that still kept the
// database inside the app directory, where every update discarded it.
ipcMain.on('importDatabase', (event) => {
  const selection = dialog.showOpenDialogSync(win, {
    title: 'Datenbank importieren',
    filters: [{ name: 'SQLite Datenbank', extensions: ['db'] }],
    properties: ['openFile'],
  });
  const source = selection?.[0];

  if (!source) {
    event.returnValue = '';
    return;
  }

  // Guard against picking an arbitrary file: every SQLite database starts with
  // this magic string.
  const header = Buffer.alloc(16);
  const handle = fs.openSync(source, 'r');
  fs.readSync(handle, header, 0, 16, 0);
  fs.closeSync(handle);

  if (header.toString('utf8', 0, 15) !== 'SQLite format 3') {
    event.returnValue = 'invalid';
    return;
  }

  const confirmed = dialog.showMessageBoxSync(win, {
    type: 'warning',
    buttons: ['Abbrechen', 'Importieren'],
    defaultId: 0,
    cancelId: 0,
    title: 'Datenbank importieren',
    message: 'Die aktuelle Datenbank wird vollständig überschrieben.',
    detail: 'Alle aktuell erfassten Daten gehen dabei verloren. Die App startet anschließend neu.',
  });

  if (confirmed !== 1) {
    event.returnValue = '';
    return;
  }

  const dbmgr = require(path.join(__dirname, `${basePath}/dbmgr`));

  // Release the handle before the file underneath it is replaced, then restart
  // so every model picks up the imported database.
  dbmgr.db.close();
  fs.copyFileSync(source, dbmgr.dbPath);
  event.returnValue = source;

  app.relaunch();
  app.exit(0);
});

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
