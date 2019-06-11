const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var express = require("express");
var router = express.Router();
const adapter = new FileSync("database.json");
const database = low(adapter);
const jwt = require("jsonwebtoken");
const hasha = require("hasha");
var uniqid = require("uniqid");
var area = require("../classes/areaManager");

var users = database.get("users").value();
areas = [];
if (users)
  users.forEach(user => {
    areas = areas.concat(user.areas);
  });
var areaManager = new area(areas);

// Users get information

router.get("/", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  res.json({ users });
});

// Users creation

router.post("/", function(req, res) {
  var { username, password, authType, token, oauthId } = req.body;
  var user;
  if (authType == "area") user = normalSignUp(username, password, res);
  else user = externalSignUp(authType, username, oauthId, token, res);
  if (!user) return;
  //   Add user to database
  database
    .get("users")
    .push(user)
    .write();
  res.status(200);
  res.send("New user created");
});

// Users connections

router.post("/connections", function(req, res) {
  var { username, password, authType, token, oauthId } = req.body;
  var user;
  if (authType == "area") user = normalSignIn(username, password, res);
  else user = externalSignIn(authType, username, oauthId, token, res);
  if (!user) return;
  //    Send response with token
  var expires = Date.now() + 60 * 60 * 1000;
  var connectToken = jwt.sign({ id: user.clientId }, "Area", {
    expiresIn: "1h"
  });
  res.status(200);
  res.json({ token: connectToken, expirationDate: expires });
});

// Users authentifications

router.get("/authentifications", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  res.json({ authentifications: user.authentifications });
});

router.post("/authentifications", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  var { authType, token, oauthId } = req.body;
  if (
    authType !== "twitter" &&
    authType !== "facebook" &&
    authType !== "google"
  ) {
    res.status(403);
    res.send("AuthType invalid");
    return;
  }
  user.authentifications[oauthId] = {
    authType: authType,
    oauthId: oauthId,
    token: token
  };
  database
    .get("users")
    .find({ authType: authType, oauthId: oauthId })
    .assign(user)
    .write();
  res.send("Authentification success");
});

// Users areas

router.get("/areas", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  if (user) res.json({ areas: user.areas });
});

router.post("/areas", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  var { area } = req.body;
  area["id"] = uniqid();
  areaManager.addArea(area);
  user.areas.push(area);
  database
    .get("users")
    .find({ clientId: user.clientId })
    .assign(user)
    .write();
  res.json({ id: area.id });
});

router.put("/areas", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  var { id, activated } = req.body;
  var index = user.areas.findIndex(function(area) {
    return id === area.id;
  });
  if (index == -1) {
    res.status(403);
    res.send("Area doesn't exist");
    return;
  }
  if (activated) {
    areaManager.startArea(id);
  } else {
    areaManager.stopArea(id);
  }
  user.areas[index].activated = activated;
  database
    .get("users")
    .find({ clientId: user.clientId })
    .assign(user)
    .write();
  res.send("Done");
});

router.delete("/areas", function(req, res) {
  var user = reqGetUser(req, res);
  if (!user) return;
  var { id } = req.body;
  var index = user.areas.findIndex(function(area) {
    return id === area.id;
  });
  if (index == -1) {
    res.status(403);
    res.send("Area doesn't exist");
    return;
  }
  areaManager.removeArea(id);
  user.areas.splice(index, 1);
  database
    .get("users")
    .find({ clientId: user.clientId })
    .assign(user)
    .write();
  res.send("Done");
});

// Misc Functions

function normalSignUp(username, password, res) {
  if (!username || !password) {
    res.status(400);
    res.send("Invalid username or password");
    return;
  }

  var userExists = database
    .get("users")
    .find({ username: username })
    .value();
  if (userExists) {
    res.status(409);
    res.send("User already exists");
    return;
  }
  var user = {
    clientId: uniqid(),
    authType: "area",
    username: username,
    password: hasha(password),
    authentifications: {},
    areas: []
  };
  return user;
}

function externalSignUp(authType, username, oauthId, token, res) {
  if (
    authType !== "twitter" &&
    authType !== "facebook" &&
    authType !== "google"
  ) {
    res.status(400);
    res.send("AuthType invalid");
    return;
  }
  if (!oauthId || !token) {
    res.status(400);
    res.send("Invalid oauthId or token");
    return;
  }
  var userExists = database
    .get("users")
    .find({ oauthId: oauthId })
    .value();
  if (userExists) {
    res.status(409);
    res.send("User already exists");
    return;
  }
  var user = {
    clientId: uniqid(),
    authType: authType,
    username: username,
    oauthId: oauthId,
    token: token,
    authentifications: {},
    areas: []
  };
  user.authentifications[oauthId] = {
    authType: authType,
    oauthId: oauthId,
    token: token
  };
  return user;
}
function normalSignIn(username, password, res) {
  var user = database
    .get("users")
    .find({ username: username, password: hasha(password) })
    .value();
  if (!user) {
    res.status(403);
    res.send("Invalid username or password");
    return;
  }
  return user;
}

function externalSignIn(authType, username, oauthId, token, res) {
  if (
    authType !== "twitter" &&
    authType !== "facebook" &&
    authType !== "google"
  ) {
    res.status(403);
    res.send("AuthType invalid");
    return;
  }
  var user = database
    .get("users")
    .find({ authType: authType, oauthId: oauthId })
    .value();
  if (!user) {
    res.status(403);
    res.send("User doesn't exist");
    return;
  }
  //  Update username and token
  user.username = username;
  user.token = token;
  user.authentifications[oauthId] = {
    authType: authType,
    oauthId: oauthId,
    token: token
  };
  database
    .get("users")
    .find({ authType: authType, oauthId: oauthId })
    .assign(user)
    .write();
  return user;
}

function reqGetUser(req, res) {
  var connectToken = req.header("Authorization");
  var clientId = jwt.verify(connectToken, "Area", function(err, decoded) {
    if (err) {
      res.status(401);
      res.send("Invalid Token");
      return null;
    }
    return decoded.id;
  });
  if (!clientId) return null;
  var user = database
    .get("users")
    .find({ clientId: clientId })
    .value();
  if (user) {
    return user;
  } else {
    res.status(401);
    res.send("Invalid ClientID");
  }
  return null;
}

module.exports = router;
