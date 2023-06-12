const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getClasses = () => {
  const sql = 'SELECT * FROM classes';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createClass = (classItem) => {
  const sql = `INSERT INTO classes (name, mascot, teacher) VALUES ('${classItem.name}', '${classItem.mascot}', '${classItem.teacher}')`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateClass = (classItem) => {
  const sql = `UPDATE classes SET name='${classItem.name}', mascot='${classItem.mascot}', teacher='${classItem.teacher}' WHERE classes.id = ${classItem.id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteClass = (id) => {
  const sql = `DELETE FROM classes WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
