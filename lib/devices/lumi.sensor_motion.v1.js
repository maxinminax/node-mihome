const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.sensor_motion.v1';
  static name = 'Mi Motion Sensor';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1568790614naen5iow.png';

};
