const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getPickup = () => {
  const sql = 'SELECT * FROM pickup';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createPickup = (item) => {
  const sql = `INSERT INTO pickup (
    childId, 
    pickupTimeMonday, 
    pickupTimeTuesday, 
    pickupTimeWednesday, 
    pickupTimeThursday, 
    pickupTimeFriday, 
    pickupTypeMonday, 
    pickupTypeTuesday, 
    pickupTypeWednesday, 
    pickupTypeThursday, 
    pickupTypeFriday,
    pickupNoteMonday, 
    pickupNoteTuesday, 
    pickupNoteWednesday, 
    pickupNoteThursday, 
    pickupNoteFriday
  ) VALUES (
    '${item.childId}', 
    '${item.pickupTimeMonday}', 
    '${item.pickupTimeTuesday}',
    '${item.pickupTimeWednesday}',
    '${item.pickupTimeThursday}',
    '${item.pickupTimeFriday}',
    '${item.pickupTypeMonday}', 
    '${item.pickupTypeTuesday}',
    '${item.pickupTypeWednesday}',
    '${item.pickupTypeThursday}',
    '${item.pickupTypeFriday}',
    '${item.pickupNoteMonday}',
    '${item.pickupNoteTuesday}',
    '${item.pickupNoteWednesday}',
    '${item.pickupNoteThursday}',
    '${item.pickupNoteFriday}'
  )`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};

exports.updatePickup = (item) => {
  const sql = `UPDATE pickup SET 
    childId='${item.childId}', 
    pickupTimeMonday='${item.pickupTimeMonday}',
    pickupTimeTuesday='${item.pickupTimeTuesday}',
    pickupTimeWednesday='${item.pickupTimeWednesday}',
    pickupTimeThursday='${item.pickupTimeThursday}',
    pickupTimeFriday='${item.pickupTimeFriday}',
    pickupTypeMonday='${item.pickupTypeMonday}',
    pickupTypeTuesday='${item.pickupTypeTuesday}',
    pickupTypeWednesday='${item.pickupTypeWednesday}',
    pickupTypeThursday='${item.pickupTypeThursday}',
    pickupTypeFriday='${item.pickupTypeFriday}',
    pickupNoteMonday='${item.pickupNoteMonday}',
    pickupNoteTuesday='${item.pickupNoteTuesday}',
    pickupNoteWednesday='${item.pickupNoteWednesday}',
    pickupNoteThursday='${item.pickupNoteThursday}',
    pickupNoteFriday='${item.pickupNoteFriday}'
  WHERE pickup.childId = ${item.childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
