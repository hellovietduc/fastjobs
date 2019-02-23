const http = require('http');
const express = require('express');
const MongoDB = require('../../config/db/mongodb');
const routes = require('../../routes');
const runTasks = require('../tasks');

const app = express();
const server = http.createServer(app);
const { PORT } = process.env;

MongoDB.init();

app.use(express.json());

routes(app);
runTasks();

server.listen(PORT);

module.exports = server;
