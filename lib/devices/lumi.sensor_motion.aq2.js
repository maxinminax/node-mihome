const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.sensor_motion.aq2';
  static name = 'Aqara Motion Sensor';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1568790644fgbf0c5c.png';

};
