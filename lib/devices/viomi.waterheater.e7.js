const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.waterheater.e7';
  static name = 'Viomi Smart Electric Water Heater Air (60L Dual-Tank Excellent)';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15695782780cdxnt19.png';

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

  getPower() {
    const state = this.properties.washStatus;
    if (state > 0) return true;
    if (state === 0) return false;
    return undefined;
  }

  getMode() {
    const mode = this.properties.modeType;
    if (mode === 0) return 'thermostatic';
    if (mode === 1) return 'heating';
    return undefined;
  }

  getTemperature() {
    const temperature = this.properties.waterTemp;
    if (Number.isInteger(temperature)) return temperature;
    return undefined;
  }

  getTargetTemperature() {
    const targetTemperature = parseInt(this.properties.targetTemp, 10);
    if (targetTemperature > 0) return targetTemperature;
    return undefined;
  }

  getWaterRemaining() {
    const waterRemaining = parseInt(this.properties.hotWater, 10);
    if (waterRemaining >= 0) return waterRemaining;
    return undefined;
  }

  getRodRemaining() {
    const rodLife = parseInt(this.properties.rodLife, 10);
    const rodUsed = parseInt(this.properties.rodUse, 10);

    if (rodLife > 0 && rodUsed >= 0) return Math.max((1 - rodUsed / rodLife) * 100, 0);
    return undefined;
  }

  getWaterLevel() {
    const waterLevel = this.properties.heatMode;
    if (waterLevel >= 0) return waterLevel + 1; // 0 - 1 -> 1 - 2
    return undefined;
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
