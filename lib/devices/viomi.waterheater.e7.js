const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.waterheater.e7';
  static name = 'Viomi Smart Electric Water Heater Air (60L Dual-Tank Excellent)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_15695782780cdxnt19.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'washStatus', // 0 - off, 2 - heat preservating
      'velocity',
      'waterTemp',
      'targetTemp',
      'errStatus',
      'hotWater',
      'needClean',
      'rodUse',
      'rodLife',
      'yiJun',
      'modeType', // 0 - thermostatic, 1 - heating
      'appointStart',
      'appointEnd',
      'appointStatus',
      'heatMode']; // 0 - single tube, 1 - double tube
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 1 : 0]);
  }

  setMode(v) {
    return this.miioCall('set_mode', [v]);
  }

  setTargetTemperature(v) {
    return this.miioCall('set_temp', [v]);
  }

  setWaterLevel(v) {
    return this.miioCall('set_heat_mode', [v]);
  }

};
