const models = require('./models');

module.exports = function createDevice({ model, ...options }) {
  if (!model) {
    throw new Error('Missing model config');
  }
  if (!models[model]) {
    throw new Error(`Model ${model} is not supported`);
  }
  const D = models[model];
  return new D(options);
};
