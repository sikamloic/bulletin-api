const mongoose = require("mongoose");


const db = {};
db.mongoose = mongoose;
db.eleve = require('./eleve');
db.bulletin = require('./bulletin');
db.model = require('./model-bulletin')

module.exports = db;