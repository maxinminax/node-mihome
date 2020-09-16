/* eslint-disable no-console */
const chalk = require('chalk');

module.exports.info = (...args) => {
  console.log(chalk.bgWhite.black(' INFO '), args.join(' '));
};

module.exports.error = (...args) => {
  console.log(chalk.bgWhite.black(' ERROR '), args.join(' '));
};

module.exports.warn = (...args) => {
  console.log(chalk.bgWhite.black(' WARNING '), args.join(' '));
};

module.exports.plain = (...args) => {
  console.log(args.join(' '));
};

module.exports.table = (...args) => {
  console.table(...args);
}