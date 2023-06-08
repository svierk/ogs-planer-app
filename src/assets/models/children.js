const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getAllChildren = () => {
  const sql = 'SELECT * FROM children';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.addChild = (firstName, lastName) => {
  const sql = 'INSERT INTO children (firstName, lastName) VALUES (?, ?)';
  const stmt = db.prepare(sql);
  const res = stmt.run(firstName, lastName);
  return res;
};
