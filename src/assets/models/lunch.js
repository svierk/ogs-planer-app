const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getLunch = () => {
  const sql = 'SELECT * FROM lunch';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createLunch = (item) => {
  const sql = `INSERT INTO lunch (
    childId,
    lunchParticipationMonday,
    lunchParticipationTuesday,
    lunchParticipationWednesday,
    lunchParticipationThursday,
    lunchParticipationFriday,
    lunchNoteMonday,
    lunchNoteTuesday,
    lunchNoteWednesday,
    lunchNoteThursday,
    lunchNoteFriday
  ) VALUES (
    '${item.childId}', 
    '${item.lunchParticipationMonday}', 
    '${item.lunchParticipationTuesday}', 
    '${item.lunchParticipationWednesday}',
    '${item.lunchParticipationThursday}',
    '${item.lunchParticipationFriday}',
    '${item.lunchNoteMonday}',
    '${item.lunchNoteTuesday}',
    '${item.lunchNoteWednesday}',
    '${item.lunchNoteThursday}',
    '${item.lunchNoteFriday}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateLunch = (item) => {
  const sql = `UPDATE lunch SET 
    childId='${item.childId}',
    lunchParticipationMonday='${item.lunchParticipationMonday}',
    lunchParticipationTuesday='${item.lunchParticipationTuesday}',
    lunchParticipationWednesday='${item.lunchParticipationWednesday}',
    lunchParticipationThursday='${item.lunchParticipationThursday}',
    lunchParticipationFriday='${item.lunchParticipationFriday}',
    lunchNoteMonday='${item.lunchNoteMonday}',
    lunchNoteTuesday='${item.lunchNoteTuesday}',
    lunchNoteWednesday='${item.lunchNoteWednesday}',
    lunchNoteThursday='${item.lunchNoteThursday}',
    lunchNoteFriday='${item.lunchNoteFriday}'
  WHERE lunch.childId = ${item.childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteLunch = (id) => {
  const sql = `DELETE FROM lunch WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
