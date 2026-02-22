const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getCourses = () => {
  return db.prepare('SELECT * FROM courses').all();
};

exports.createCourse = (course) => {
  const stmt = db.prepare(
    'INSERT INTO courses (name, teacher, day, note, start, end) VALUES (?, ?, ?, ?, ?, ?)'
  );
  return stmt.run(course.name, course.teacher, course.day, course.note ?? null, course.start, course.end);
};

exports.updateCourse = (course) => {
  const stmt = db.prepare(
    'UPDATE courses SET name = ?, teacher = ?, day = ?, note = ?, start = ?, end = ? WHERE id = ?'
  );
  return stmt.run(course.name, course.teacher, course.day, course.note ?? null, course.start, course.end, course.id);
};

exports.deleteCourse = (id) => {
  db.transaction(() => {
    db.prepare('DELETE FROM childCourses WHERE courseId = ?').run(id);
    db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  })();
};
