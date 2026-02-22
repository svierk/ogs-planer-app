const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getEarlyCare = () => {
  return db.prepare('SELECT * FROM earlyCare').all();
};

exports.createEarlyCare = (items) => {
  const insert = db.prepare('INSERT INTO earlyCare (childId, day, participation, start, note) VALUES (?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const item of items) {
      insert.run(item.childId, item.day, item.participation, item.start, item.note ?? null);
    }
  })();
};

exports.updateEarlyCare = (items) => {
  const upsert = db.prepare(`
    INSERT INTO earlyCare (childId, day, participation, start, note)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(childId, day) DO UPDATE SET
      participation = excluded.participation,
      start = excluded.start,
      note = excluded.note
  `);
  db.transaction(() => {
    for (const item of items) {
      upsert.run(item.childId, item.day, item.participation, item.start, item.note ?? null);
    }
  })();
};
