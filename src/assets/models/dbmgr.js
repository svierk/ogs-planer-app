const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db/mysqlite.db'));

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const DAY_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function tableExists(name) {
  return !!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(name);
}

function hasColumn(table, column) {
  return db
    .prepare(`PRAGMA table_info(${table})`)
    .all()
    .some((c) => c.name === column);
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT,
      mobile TEXT,
      emergencyContact TEXT,
      classId INTEGER,
      pickupAuthorization TEXT,
      allergies TEXT
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      teacher TEXT
    );

    CREATE TABLE IF NOT EXISTS classSchedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      classId INTEGER NOT NULL,
      day TEXT NOT NULL,
      lunchTime TEXT,
      homeworkTime TEXT,
      UNIQUE(classId, day)
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      teacher TEXT NOT NULL,
      day TEXT NOT NULL,
      start TEXT NOT NULL,
      end TEXT NOT NULL,
      note TEXT
    );

    CREATE TABLE IF NOT EXISTS childCourses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      courseId INTEGER NOT NULL,
      UNIQUE(childId, courseId)
    );

    CREATE TABLE IF NOT EXISTS earlyCare (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      day TEXT NOT NULL,
      participation INTEGER NOT NULL DEFAULT 0,
      start TEXT,
      note TEXT,
      UNIQUE(childId, day)
    );

    CREATE TABLE IF NOT EXISTS lunch (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      day TEXT NOT NULL,
      participation INTEGER NOT NULL DEFAULT 0,
      note TEXT,
      UNIQUE(childId, day)
    );

    CREATE TABLE IF NOT EXISTS homework (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      day TEXT NOT NULL,
      participation INTEGER NOT NULL DEFAULT 0,
      note TEXT,
      UNIQUE(childId, day)
    );

    CREATE TABLE IF NOT EXISTS pickup (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      day TEXT NOT NULL,
      pickupTime TEXT,
      pickupType TEXT,
      note TEXT,
      UNIQUE(childId, day)
    );
  `);
}

function migrate() {
  // Migrate earlyCare: 15 day-specific columns → 5 rows per child
  if (tableExists('earlyCare') && hasColumn('earlyCare', 'earlyCareParticipationMonday')) {
    const oldRows = db.prepare('SELECT * FROM earlyCare').all();
    db.exec('DROP TABLE earlyCare');
    db.exec(`
      CREATE TABLE earlyCare (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER NOT NULL,
        day TEXT NOT NULL,
        participation INTEGER NOT NULL DEFAULT 0,
        start TEXT,
        note TEXT,
        UNIQUE(childId, day)
      )
    `);
    const insert = db.prepare(
      'INSERT INTO earlyCare (childId, day, participation, start, note) VALUES (?, ?, ?, ?, ?)'
    );
    db.transaction(() => {
      for (const row of oldRows) {
        for (let i = 0; i < DAYS.length; i++) {
          insert.run(
            row.childId,
            DAYS[i],
            row[`earlyCareParticipation${DAY_KEYS[i]}`],
            row[`earlyCareStart${DAY_KEYS[i]}`],
            row[`earlyCareNote${DAY_KEYS[i]}`] ?? null
          );
        }
      }
    })();
  }

  // Migrate lunch: 10 day-specific columns → 5 rows per child
  if (tableExists('lunch') && hasColumn('lunch', 'lunchParticipationMonday')) {
    const oldRows = db.prepare('SELECT * FROM lunch').all();
    db.exec('DROP TABLE lunch');
    db.exec(`
      CREATE TABLE lunch (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER NOT NULL,
        day TEXT NOT NULL,
        participation INTEGER NOT NULL DEFAULT 0,
        note TEXT,
        UNIQUE(childId, day)
      )
    `);
    const insert = db.prepare('INSERT INTO lunch (childId, day, participation, note) VALUES (?, ?, ?, ?)');
    db.transaction(() => {
      for (const row of oldRows) {
        for (let i = 0; i < DAYS.length; i++) {
          insert.run(
            row.childId,
            DAYS[i],
            row[`lunchParticipation${DAY_KEYS[i]}`],
            row[`lunchNote${DAY_KEYS[i]}`] ?? null
          );
        }
      }
    })();
  }

  // Migrate homework: 10 day-specific columns → 5 rows per child
  if (tableExists('homework') && hasColumn('homework', 'homeworkParticipationMonday')) {
    const oldRows = db.prepare('SELECT * FROM homework').all();
    db.exec('DROP TABLE homework');
    db.exec(`
      CREATE TABLE homework (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER NOT NULL,
        day TEXT NOT NULL,
        participation INTEGER NOT NULL DEFAULT 0,
        note TEXT,
        UNIQUE(childId, day)
      )
    `);
    const insert = db.prepare('INSERT INTO homework (childId, day, participation, note) VALUES (?, ?, ?, ?)');
    db.transaction(() => {
      for (const row of oldRows) {
        for (let i = 0; i < DAYS.length; i++) {
          insert.run(
            row.childId,
            DAYS[i],
            row[`homeworkParticipation${DAY_KEYS[i]}`],
            row[`homeworkNote${DAY_KEYS[i]}`] ?? null
          );
        }
      }
    })();
  }

  // Migrate pickup: 15 day-specific columns → 5 rows per child
  if (tableExists('pickup') && hasColumn('pickup', 'pickupTimeMonday')) {
    const oldRows = db.prepare('SELECT * FROM pickup').all();
    db.exec('DROP TABLE pickup');
    db.exec(`
      CREATE TABLE pickup (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER NOT NULL,
        day TEXT NOT NULL,
        pickupTime TEXT,
        pickupType TEXT,
        note TEXT,
        UNIQUE(childId, day)
      )
    `);
    const insert = db.prepare('INSERT INTO pickup (childId, day, pickupTime, pickupType, note) VALUES (?, ?, ?, ?, ?)');
    db.transaction(() => {
      for (const row of oldRows) {
        for (let i = 0; i < DAYS.length; i++) {
          insert.run(
            row.childId,
            DAYS[i],
            row[`pickupTime${DAY_KEYS[i]}`] ?? null,
            row[`pickupType${DAY_KEYS[i]}`],
            row[`pickupNote${DAY_KEYS[i]}`] ?? null
          );
        }
      }
    })();
  }

  // Migrate classes: extract day-specific schedule into classSchedule table
  if (tableExists('classes') && hasColumn('classes', 'lunchMonday')) {
    const oldClasses = db.prepare('SELECT * FROM classes').all();

    if (!tableExists('classSchedule')) {
      db.exec(`
        CREATE TABLE classSchedule (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          classId INTEGER NOT NULL,
          day TEXT NOT NULL,
          lunchTime TEXT,
          homeworkTime TEXT,
          UNIQUE(classId, day)
        )
      `);
    }

    const insertSchedule = db.prepare(
      'INSERT OR IGNORE INTO classSchedule (classId, day, lunchTime, homeworkTime) VALUES (?, ?, ?, ?)'
    );
    db.transaction(() => {
      for (const cls of oldClasses) {
        for (let i = 0; i < DAYS.length; i++) {
          insertSchedule.run(
            cls.id,
            DAYS[i],
            cls[`lunch${DAY_KEYS[i]}`] ?? null,
            cls[`homework${DAY_KEYS[i]}`] ?? null
          );
        }
      }
    })();

    db.exec('CREATE TABLE classes_new (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, teacher TEXT)');
    db.exec('INSERT INTO classes_new (id, name, teacher) SELECT id, name, teacher FROM classes');
    db.exec('DROP TABLE classes');
    db.exec('ALTER TABLE classes_new RENAME TO classes');
  }
}

migrate();
initSchema();

exports.db = db;
