const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.sensor_ht.v1';
  static name = 'Mi Temperature and Humidity Sensor';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551946270wfcy8jua.png';

};
