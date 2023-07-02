const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getEarlyCare = () => {
  const sql = 'SELECT * FROM earlyCare';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createEarlyCare = (item) => {
  const sql = `INSERT INTO earlyCare (
    childId,
    earlyCareParticipationMonday,
    earlyCareParticipationTuesday,
    earlyCareParticipationWednesday,
    earlyCareParticipationThursday,
    earlyCareParticipationFriday,
    earlyCareStartMonday,
    earlyCareStartTuesday,
    earlyCareStartWednesday,
    earlyCareStartThursday,
    earlyCareStartFriday
  ) VALUES (
    '${item.childId}', 
    '${item.earlyCareParticipationMonday}', 
    '${item.earlyCareParticipationTuesday}', 
    '${item.earlyCareParticipationWednesday}',
    '${item.earlyCareParticipationThursday}',
    '${item.earlyCareParticipationFriday}',
    '${item.earlyCareStartMonday}',
    '${item.earlyCareStartTuesday}',
    '${item.earlyCareStartWednesday}',
    '${item.earlyCareStartThursday}',
    '${item.earlyCareStartFriday}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateEarlyCare = (item) => {
  const sql = `UPDATE earlyCare SET 
    childId='${item.childId}',
    earlyCareParticipationMonday='${item.earlyCareParticipationMonday}',
    earlyCareParticipationTuesday='${item.earlyCareParticipationTuesday}',
    earlyCareParticipationWednesday='${item.earlyCareParticipationWednesday}',
    earlyCareParticipationThursday='${item.earlyCareParticipationThursday}',
    earlyCareParticipationFriday='${item.earlyCareParticipationFriday}',
    earlyCareStartMonday='${item.earlyCareStartMonday}',
    earlyCareStartTuesday='${item.earlyCareStartTuesday}',
    earlyCareStartWednesday='${item.earlyCareStartWednesday}',
    earlyCareStartThursday='${item.earlyCareStartThursday}',
    earlyCareStartFriday='${item.earlyCareStartFriday}'
  WHERE earlyCare.childId = ${item.childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
