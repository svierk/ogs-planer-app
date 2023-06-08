const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db/mysqlite.db'));

exports.db = db;
