const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.sensor_magnet.v2';
  static name = 'Mi Door & window sensor';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551946067z8jchf67.png';

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
