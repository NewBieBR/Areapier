const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var express = require('express');
var router = express.Router();
const adapter = new FileSync("database.json");
const database = low(adapter);

/* GET services listing. */
router.get("/", function(req, res) {
  var services = database.get("services").value();
  var about = {client: { host: req.ip },
    server: { current_time: Math.round(new Date().getTime() / 1000), services: [] } };
  Object.keys(services).forEach(function(key) {
    var serv = {
      name: services[key].name,
      actions: [],
      reactions: []
    };
    services[key].actions.forEach(action => {
      serv.actions.push({name: action.name, description: action.description})
    });
    services[key].reactions.forEach(reaction => {
      serv.reactions.push({name: reaction.name, description: reaction.description})
    });
    about.server.services.push(serv);
  });
  res.json(about);
});

module.exports = router;