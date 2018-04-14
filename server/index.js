const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');

// db
var promise = mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// app setup
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// server setup
router(app);
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('server is running on port ' + port);
