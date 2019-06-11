const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var express = require('express');
var router = express.Router();
const adapter = new FileSync("database.json");
const database = low(adapter);

/* GET services listing. */
router.get("/", function(req, res) {
  var services = database.get("services").value();
  res.json({ services: services });
});

module.exports = router;