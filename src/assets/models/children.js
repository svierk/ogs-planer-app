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
  const sql = `INSERT INTO children (firstName, lastName, phone) VALUES ('${child.firstName}', '${child.lastName}', '${child.phone}')`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateChild = (child) => {
  const sql = `UPDATE children SET firstName=${child.firstName}, lastName=${child.lastName} WHERE id = ${child.id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteChild = (id) => {
  const sql = `DELETE FROM children WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
