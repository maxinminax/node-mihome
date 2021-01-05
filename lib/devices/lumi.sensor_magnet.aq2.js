const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.sensor_magnet.aq2';
  static name = 'Aqara Door & window sensor';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15519469912gr3ftq9.png';

  _onData(data) {
    if (data.no_close) {
      data.status = 'open';
    }
    super._onData(data);
  }

  getBattery() {
    return utils.getBatteryFromVoltage(this.properties.voltage);
  }

  getStatus() {
    return this.properties.status;
  }

};
