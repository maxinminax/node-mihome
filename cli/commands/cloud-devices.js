const log = require('../log');
const micloudProtocol = require('../../lib/protocol-micloud');

exports.command = 'cloud-devices';
exports.description = 'Get list devices from cloud';
exports.builder = {
  username: {
    alias: 'u',
    type: 'string',
    description: 'Username',
    required: true
  },
  password: {
    alias: 'p',
    type: 'string',
    required: 'Password'
  },
  country: {
    alias: 'c',
    type: 'string',
    description: 'Country code',
    default: 'cn'
  }
};

exports.handler = async argv => {
  const { username, password, country } = argv;
  try {
    await micloudProtocol.login(username, password);
    let devices = await micloudProtocol.getDevices(null, { country });
    devices = devices.map(({
      did, name, token, model
    }) => {
      return {
        did, name, token, model
      };
    });
    log.table(devices);
  } catch (e) {
    log.error(e.message);
  }
};
