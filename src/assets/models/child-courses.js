const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getChildCourses = () => {
  const sql = 'SELECT * FROM childCourses';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createChildCourse = (course) => {
  const sql = `INSERT INTO childCourses (
    childId, 
    courseId
  ) VALUES (
    '${course.childId}', 
    '${course.courseId}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateChildCourse = (course) => {
  const sql = `UPDATE childCourses SET 
    childId='${course.childId}', 
    courseId='${course.courseId}'
  WHERE childCourses.childId = ${course.childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteChildCourse = (id) => {
  const sql = `DELETE FROM childCourses WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
