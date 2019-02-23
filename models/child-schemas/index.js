/* eslint-disable global-require,import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const basename = path.basename(__filename);
const schemas = {};

fs
  .readdirSync(__dirname)
  .filter(fileName => fileName.indexOf('.') > 0
    && fileName.slice(-3) === '.js'
    && fileName !== basename)
  .forEach((fileName) => {
    const schemaDef = require(path.join(__dirname, fileName));
    const schema = new mongoose.Schema(schemaDef.schema, schemaDef.options);
    schema.getPaths = function getPaths() {
      const paths = [];
      this.eachPath(p => paths.push(p));
      return paths;
    };
    const modelName = fileName.split('.')[0];
    schemas[modelName] = schema;
  });

module.exports = schemas;
