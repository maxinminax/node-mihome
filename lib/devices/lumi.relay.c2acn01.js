const Device = require('../device-miio');

module.exports = class extends Device {
  static model = 'lumi.relay.c2acn01';
  static name = 'Aqara Wireless Relay Controller(2 Channels)';
  static image = 'https://cdn.cnbj2.fds.api.mi-img.com/cdn/lumi/deviceImg/lumi.relay.c2acn01.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [];
  }

  getPower(channel = 0) {
    return this.miioCall('get_device_prop_exp', [[this.id, `channel_${channel}`]]);
  }

  getLoadPower() {
    return this.miioCall('get_device_prop_exp', [[this.id, 'load_power']]);
  }

  setPower(v, channel = 0) {
    return this.miioCall('toggle_ctrl_neutral', [`channel_${channel}`, v ? 'on' : 'off'], { sid: this.id });
  }
};
