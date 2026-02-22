const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getPickup = () => {
  return db.prepare('SELECT * FROM pickup').all();
};

exports.createPickup = (items) => {
  const insert = db.prepare(
    'INSERT INTO pickup (childId, day, pickupTime, pickupType, note) VALUES (?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const item of items) {
      insert.run(item.childId, item.day, item.pickupTime ?? null, item.pickupType, item.note ?? null);
    }
  })();
};

exports.updatePickup = (items) => {
  const upsert = db.prepare(`
    INSERT INTO pickup (childId, day, pickupTime, pickupType, note)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(childId, day) DO UPDATE SET
      pickupTime = excluded.pickupTime,
      pickupType = excluded.pickupType,
      note = excluded.note
  `);
  db.transaction(() => {
    for (const item of items) {
      upsert.run(item.childId, item.day, item.pickupTime ?? null, item.pickupType, item.note ?? null);
    }
  })();
};
