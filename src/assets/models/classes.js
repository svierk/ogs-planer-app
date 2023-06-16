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
  const sql = `INSERT INTO classes (
    name, 
    teacher, 
    lunchMonday, 
    lunchTuesday, 
    lunchWednesday, 
    lunchThursday, 
    lunchFriday, 
    homeworkMonday, 
    homeworkTuesday, 
    homeworkWednesday, 
    homeworkThursday, 
    homeworkFriday
  ) VALUES (
    '${classItem.name}', 
    '${classItem.teacher}', 
    '${classItem.lunchMonday}', 
    '${classItem.lunchTuesday}',
    '${classItem.lunchWednesday}',
    '${classItem.lunchThursday}',
    '${classItem.lunchFriday}',
    '${classItem.homeworkMonday}',
    '${classItem.homeworkTuesday}',
    '${classItem.homeworkWednesday}',
    '${classItem.homeworkThursday}',
    '${classItem.homeworkFriday}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateClass = (classItem) => {
  const sql = `UPDATE classes SET 
    name='${classItem.name}', 
    teacher='${classItem.teacher}',
    lunchMonday='${classItem.lunchMonday}',
    lunchTuesday='${classItem.lunchTuesday}',
    lunchWednesday='${classItem.lunchWednesday}',
    lunchThursday='${classItem.lunchThursday}',
    lunchFriday='${classItem.lunchFriday}',
    homeworkMonday='${classItem.lunchMonday}',
    homeworkTuesday='${classItem.lunchTuesday}',
    homeworkWednesday='${classItem.lunchWednesday}',
    homeworkThursday='${classItem.lunchThursday}',
    homeworkFriday='${classItem.lunchFriday}'
  WHERE classes.id = ${classItem.id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteClass = (id) => {
  const stmts = [
    `DELETE FROM classes WHERE id = ${id}`,
    `UPDATE children SET classId=${null} WHERE children.classId = ${id}`,
  ].map((sql) => db.prepare(sql));
  const transaction = db.transaction(() => {
    for (const stmt of stmts) {
      const res = stmt.run();
      console.log(res);
    }
  });
  transaction();
  return;
};
