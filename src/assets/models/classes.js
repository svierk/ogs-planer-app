const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getClasses = () => {
  return db.prepare('SELECT * FROM classes').all();
};

exports.createClass = (classItem) => {
  const insertClass = db.prepare('INSERT INTO classes (name, teacher) VALUES (?, ?)');
  const insertSchedule = db.prepare(
    'INSERT INTO classSchedule (classId, day, lunchTime, homeworkTime) VALUES (?, ?, ?, ?)'
  );
  db.transaction(() => {
    const result = insertClass.run(classItem.name, classItem.teacher ?? null);
    const classId = result.lastInsertRowid;
    for (const s of classItem.schedule || []) {
      insertSchedule.run(classId, s.day, s.lunchTime ?? null, s.homeworkTime ?? null);
    }
  })();
};

exports.updateClass = (classItem) => {
  const updateClass = db.prepare('UPDATE classes SET name = ?, teacher = ? WHERE id = ?');
  const upsertSchedule = db.prepare(`
    INSERT INTO classSchedule (classId, day, lunchTime, homeworkTime)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(classId, day) DO UPDATE SET
      lunchTime = excluded.lunchTime,
      homeworkTime = excluded.homeworkTime
  `);
  db.transaction(() => {
    updateClass.run(classItem.name, classItem.teacher ?? null, classItem.id);
    for (const s of classItem.schedule || []) {
      upsertSchedule.run(classItem.id, s.day, s.lunchTime ?? null, s.homeworkTime ?? null);
    }
  })();
};

exports.deleteClass = (id) => {
  db.transaction(() => {
    db.prepare('DELETE FROM classSchedule WHERE classId = ?').run(id);
    db.prepare('UPDATE children SET classId = NULL WHERE classId = ?').run(id);
    db.prepare('DELETE FROM classes WHERE id = ?').run(id);
  })();
};
