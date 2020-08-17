const path = require('path');
const glob = require('glob');

const models = {};

glob.sync(path.resolve(__dirname, './devices/*.js')).forEach(modelPath => {
  const modelName = path.parse(modelPath).name;
  // eslint-disable-next-line global-require, import/no-dynamic-require
  models[modelName] = require(modelPath);
});

module.exports = models;
