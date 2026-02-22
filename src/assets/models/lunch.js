const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getLunch = () => {
  return db.prepare('SELECT * FROM lunch').all();
};

exports.createLunch = (items) => {
  const insert = db.prepare(
    'INSERT INTO lunch (childId, day, participation, note) VALUES (?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const item of items) {
      insert.run(item.childId, item.day, item.participation, item.note ?? null);
    }
  })();
};

exports.updateLunch = (items) => {
  const upsert = db.prepare(`
    INSERT INTO lunch (childId, day, participation, note)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(childId, day) DO UPDATE SET
      participation = excluded.participation,
      note = excluded.note
  `);
  db.transaction(() => {
    for (const item of items) {
      upsert.run(item.childId, item.day, item.participation, item.note ?? null);
    }
  })();
};
