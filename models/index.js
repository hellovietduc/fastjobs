/* eslint-disable global-require,import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const basename = path.basename(__filename);
const models = {};

fs
  .readdirSync(__dirname)
  .filter(fileName => fileName.indexOf('.') > 0
    && fileName.slice(-3) === '.js'
    && fileName !== basename)
  .forEach((fileName) => {
    const schemaDef = require(path.join(__dirname, fileName));
    const schema = new mongoose.Schema(schemaDef.schema, schemaDef.options);
    const modelName = fileName.split('.')[0];
    if (schemaDef.index) schema.index(schemaDef.index);
    models[modelName] = mongoose.model(modelName, schema, schemaDef.collection);
  });

module.exports = models;
