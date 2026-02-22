const path = require('path');

const dbmgr = require(path.join(__dirname, 'dbmgr'));
const db = dbmgr.db;

exports.getChildren = () => {
  return db.prepare('SELECT * FROM children').all();
};

exports.createChild = (child) => {
  const stmt = db.prepare(`
    INSERT INTO children (firstName, lastName, phone, mobile, emergencyContact, classId, pickupAuthorization, allergies)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    child.firstName,
    child.lastName,
    child.phone ?? null,
    child.mobile ?? null,
    child.emergencyContact ?? null,
    child.classId ? +child.classId : null,
    child.pickupAuthorization ?? null,
    child.allergies ?? null
  );
};

exports.updateChild = (child) => {
  const stmt = db.prepare(`
    UPDATE children SET
      firstName = ?,
      lastName = ?,
      phone = ?,
      mobile = ?,
      emergencyContact = ?,
      classId = ?,
      pickupAuthorization = ?,
      allergies = ?
    WHERE id = ?
  `);
  return stmt.run(
    child.firstName,
    child.lastName,
    child.phone ?? null,
    child.mobile ?? null,
    child.emergencyContact ?? null,
    child.classId ? +child.classId : null,
    child.pickupAuthorization ?? null,
    child.allergies ?? null,
    child.id
  );
};

exports.deleteChild = (id) => {
  db.transaction(() => {
    db.prepare('DELETE FROM pickup WHERE childId = ?').run(id);
    db.prepare('DELETE FROM childCourses WHERE childId = ?').run(id);
    db.prepare('DELETE FROM homework WHERE childId = ?').run(id);
    db.prepare('DELETE FROM lunch WHERE childId = ?').run(id);
    db.prepare('DELETE FROM earlyCare WHERE childId = ?').run(id);
    db.prepare('DELETE FROM children WHERE id = ?').run(id);
  })();
};
