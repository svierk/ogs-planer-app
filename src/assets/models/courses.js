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
    note,
    start,
    end
  ) VALUES (
    '${course.name}', 
    '${course.teacher}', 
    '${course.day}', 
    '${course.note}',
    '${course.start}',
    '${course.end}'
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
    note='${course.note}',
    start='${course.start}',
    end='${course.end}'
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
