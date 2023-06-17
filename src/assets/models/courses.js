const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getCourses = () => {
  const sql = 'SELECT * FROM courses';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createCourse = (course) => {
  const sql = `INSERT INTO courses (
    name, 
    teacher, 
    day, 
    time,
    note
  ) VALUES (
    '${course.name}', 
    '${course.teacher}', 
    '${course.day}', 
    '${course.time}',
    '${course.note}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateCourse = (course) => {
  const sql = `UPDATE courses SET 
    name='${course.name}', 
    teacher='${course.teacher}', 
    day='${course.day}', 
    time='${course.time}', 
    note='${course.note}' 
  WHERE courses.id = ${course.id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteCourse = (id) => {
  const sql = `DELETE FROM courses WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
