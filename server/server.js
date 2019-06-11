const express = require("express");
const http = require('http');
const https = require('https');
var fs = require('fs');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const cors = require("cors");
const bodyParser = require("body-parser");
const defaultDatabase = require("./default_database");
var usersRouter = require('./routes/users');
var servicesRouter = require('./routes/services');
var aboutRouter = require('./routes/about');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');


const app = express();
const port = 8080;
const http_port = 4040;
const host = "0.0.0.0";
const adapter = new FileSync("database.json");
const database = low(adapter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Set blank database architecture
database.defaults(defaultDatabase).write();

http.createServer(app).listen(http_port);
https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port);

app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/about.json', aboutRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log(`Running on https://${host}:${port}`);
console.log(`Running on http://${host}:${http_port}`);
