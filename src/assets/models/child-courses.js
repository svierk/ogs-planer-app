const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getChildCourses = () => {
  return db.prepare('SELECT * FROM childCourses').all();
};

exports.getChildCoursesByChildId = (childId) => {
  return db.prepare('SELECT * FROM childCourses WHERE childId = ?').all(childId);
};

exports.createChildCourses = (courses) => {
  if (!courses?.length) return;
  const insert = db.prepare('INSERT INTO childCourses (childId, courseId) VALUES (?, ?)');
  db.transaction(() => {
    for (const course of courses) {
      insert.run(course.childId, course.courseId);
    }
  })();
};

exports.updateChildCourses = (courseInfo) => {
  const isNumber = typeof courseInfo === 'number';
  const id = isNumber ? courseInfo : courseInfo[0]?.childId;
  const existing = exports.getChildCoursesByChildId(id);
  if (id || existing?.length > 0) exports.deleteChildCourses(id);
  if (!isNumber) exports.createChildCourses(courseInfo);
};

exports.deleteChildCourses = (childId) => {
  return db.prepare('DELETE FROM childCourses WHERE childId = ?').run(childId);
};
