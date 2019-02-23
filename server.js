const http = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const MongoDB = require('./config/db/mongodb');
const routes = require('./routes');
const runTasks = require('./tasks');
const runTasksV2 = require('./_v2/tasks');
const log = require('./config/log');

const app = express();
const server = http.createServer(app);
const { PORT } = process.env;

MongoDB.init();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(passport.initialize());
app.disable('x-powered-by');

routes(app);
runTasks();
runTasksV2();

server.listen(PORT, () => log.info(`server running on port ${PORT}`));
