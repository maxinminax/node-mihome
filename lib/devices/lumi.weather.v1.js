const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.weather.v1';
  static name = 'Aqara Temperature and Humidity Sensor';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551946494759k1632.png';

};
