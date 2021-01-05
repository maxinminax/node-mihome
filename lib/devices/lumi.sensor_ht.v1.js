const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.sensor_ht.v1';
  static name = 'Mi Temperature and Humidity Sensor';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551946270wfcy8jua.png';

  getBattery() {
    return utils.getBatteryFromVoltage(this.properties.voltage);
  }

  getTemperature() {
    const temperature = parseInt(this.properties.temperature, 10);
    if (Number.isInteger(temperature)) return temperature / 100;
    return undefined;
  }

  getHumidity() {
    const humidity = parseInt(this.properties.humidity, 10);
    if (Number.isInteger(humidity)) return humidity / 100;
    return undefined;
  }

};
