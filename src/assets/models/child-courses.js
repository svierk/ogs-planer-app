const path = require('path');

let dbmgr = require(path.join(__dirname, 'dbmgr'));
let db = dbmgr.db;

exports.getChildCourses = () => {
  const sql = 'SELECT * FROM childCourses';
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.getChildCoursesByChildId = (childId) => {
  const sql = `SELECT * FROM childCourses WHERE childId = ${childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.all();
  return res;
};

exports.createChildCourses = (courses) => {
  if (courses?.length === 0) return;

  const queries = [];
  courses.forEach((course) => {
    queries.push(`INSERT INTO childCourses (
      childId,
      courseId
    ) VALUES (
      '${course.childId}',
      '${course.courseId}'
    )`);
  });

  const stmts = queries.map((sql) => db.prepare(sql));
  const transaction = db.transaction(() => {
    for (const stmt of stmts) {
      stmt.run();
    }
  });
  transaction();
  return;
};

exports.updateChildCourses = (courseInfo) => {
  const isNumber = typeof courseInfo === 'number';
  const id = isNumber ? courseInfo : courseInfo[0]?.childId;
  const courses = this.getChildCoursesByChildId(id);
  if (id || courses?.length > 0) this.deleteChildCourses(id);
  if (!isNumber) this.createChildCourses(courseInfo);
  return;
};

exports.deleteChildCourses = (childId) => {
  const sql = `DELETE FROM childCourses WHERE childId = ${childId}`;
  const stmt = db.prepare(sql);
  const res = stmt.run();
  return res;
};
