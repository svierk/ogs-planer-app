const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getChildren = () => {
  const sql = 'SELECT * FROM children';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createChild = (child) => {
  const sql = `INSERT INTO children (
    firstName, 
    lastName, 
    phone,
    mobile,
    emergencyContact,
    classId
  ) VALUES (
    '${child.firstName}', 
    '${child.lastName}', 
    '${child.phone}',
    '${child.mobile}',
    '${child.emergencyContact}',
    '${+child.classId}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateChild = (child) => {
  const sql = `UPDATE children SET 
    firstName='${child.firstName}', 
    lastName='${child.lastName}', 
    phone='${child.phone}',
    mobile='${child.mobile}',
    emergencyContact='${child.emergencyContact}',
    classId='${child.classId}' 
  WHERE children.id = ${child.id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteChild = (id) => {
  const stmts = [
    `DELETE FROM children WHERE id = ${id}`,
    `DELETE FROM earlyCare WHERE childId = ${id}`,
    `DELETE FROM lunch WHERE childId = ${id}`,
    `DELETE FROM homework WHERE childId = ${id}`,
    `DELETE FROM childCourses WHERE childId = ${id}`,
    `DELETE FROM pickup WHERE childId = ${id}`,
  ].map((sql) => db.prepare(sql));
  const transaction = db.transaction(() => {
    for (const stmt of stmts) {
      stmt.run();
    }
  });
  transaction();
  return;
};
