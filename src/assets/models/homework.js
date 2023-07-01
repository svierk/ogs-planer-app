const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getHomework = () => {
  const sql = 'SELECT * FROM homework';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createHomework = (item) => {
  const sql = `INSERT INTO homework (
    childId, 
    homeworkParticipationMonday, 
    homeworkParticipationTuesday, 
    homeworkParticipationWednesday, 
    homeworkParticipationThursday, 
    homeworkParticipationFriday, 
    homeworkNoteMonday, 
    homeworkNoteTuesday, 
    homeworkNoteWednesday, 
    homeworkNoteThursday, 
    homeworkNoteFriday
  ) VALUES (
    '${item.childId}',
    '${item.homeworkParticipationMonday}', 
    '${item.homeworkParticipationTuesday}',
    '${item.homeworkParticipationWednesday}',
    '${item.homeworkParticipationThursday}',
    '${item.homeworkParticipationFriday}',
    '${item.homeworkNoteMonday}',
    '${item.homeworkNoteTuesday}',
    '${item.homeworkNoteWednesday}',
    '${item.homeworkNoteThursday}',
    '${item.homeworkNoteFriday}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updateHomework = (item) => {
  const sql = `UPDATE homework SET 
    childId='${item.childId}', 
    homeworkParticipationMonday='${item.homeworkParticipationMonday}',
    homeworkParticipationTuesday='${item.homeworkParticipationTuesday}',
    homeworkParticipationWednesday='${item.homeworkParticipationWednesday}',
    homeworkParticipationThursday='${item.homeworkParticipationThursday}',
    homeworkParticipationFriday='${item.homeworkParticipationFriday}',
    homeworkNoteMonday='${item.homeworkNoteMonday}',
    homeworkNoteTuesday='${item.homeworkNoteTuesday}',
    homeworkNoteWednesday='${item.homeworkNoteWednesday}',
    homeworkNoteThursday='${item.homeworkNoteThursday}',
    homeworkNoteFriday='${item.homeworkNoteFriday}'
  WHERE homework.childId = ${item.childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.deleteHomework = (id) => {
  const sql = `DELETE FROM homework WHERE id = ${id}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
