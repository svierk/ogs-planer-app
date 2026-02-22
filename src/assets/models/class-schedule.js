const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getClassSchedules = () => {
  return db.prepare('SELECT * FROM classSchedule').all();
};
