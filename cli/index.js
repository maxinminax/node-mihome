#!/usr/bin/env node
/* eslint-disable no-unused-expressions */

const path = require('path');
require('yargs')
  .commandDir(path.join(__dirname, 'commands'))
  .recommendCommands()
  .demandCommand()
  .argv;
