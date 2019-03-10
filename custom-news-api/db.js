let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');
let adapter = new FileSync('db.json');

let db = low(adapter);

module.exports = db;
