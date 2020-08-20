const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.airpurifier.ma4';
  static name = 'Mi Air Purifier 3';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1543307568u9wu6wij.png';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-ma4:2';
    this._propertiesToMonitor = [
      'air-purifier:fault',
      'air-purifier:on',
      'air-purifier:fan-level',
      'air-purifier:mode',
      'environment:pm2.5-density',
      'environment:relative-humidity',
      'environment:temperature',
      'filter:filter-life-level',
      'filter:filter-used-time',
      'alarm:alarm',
      'indicator-light:brightness',
      'indicator-light:on',
      'physical-controls-locked:physical-controls-locked'];
  }

  getPower() {
    return this.properties['air-purifier:on'];
  }

  getMode() {
    return this.properties['air-purifier:mode'];
  }

  getFanLevel() {
    return this.properties['air-purifier:fan-level'];
  }

  getTemperature() {
    return this.properties['environment:temperature'];
  }

  getHumidity() {
    return this.properties['environment:relative-humidity'];
  }

  // eslint-disable-next-line camelcase
  getPM2_5() {
    return this.properties['environment:pm2.5-density'];
  }

  getFilterRemaining() {
    const filterLife = this.properties['filter:filter-life-level'];
    const filterUsed = this.properties['filter:filter-used-time'];
    if (filterLife > 0 && filterUsed >= 0) return Math.max((1 - filterUsed / filterLife) * 100, 0);
    return undefined;
  }

  getBuzzer() {
    return this.properties['alarm:alarm'];
  }

  getLcdBrightness() {
    return this.properties['indicator-light:brightness'];
  }

  setPower(v) {
    return this.miotSetProperty('air-purifier:on', v);
  }

  setMode(v) { // 0-Auto, 1-Sleep, 2-Favorite, 3-None
    return this.miotSetProperty('set_mode', v);
  }

  setFanLevel(v) { // 1-3
    return this.miotSetProperty('air-purifier:fan-level', v);
  }

  setBuzzer(v) {
    return this.miotSetProperty('alarm:alarm', v);
  }

  setLcdBrightness() { // 0-brightest, 1-glimmer, 2-led_closed
    return this.miotSetProperty('indicator-light:brightness');
  }

  setChildLock() {
    return this.miotSetProperty('physical-controls-locked:physical-controls-locked', v);
  }

};
