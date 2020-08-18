const models = require('./models');

module.exports = function createDevice(options) {
  if (!options.model) {
    throw new Error('Missing model config');
  }
  if (!models[options.model]) {
    throw new Error(`Model ${options.model} is not supported`);
  }
  const D = models[options.model];
  return new D(options);
};
