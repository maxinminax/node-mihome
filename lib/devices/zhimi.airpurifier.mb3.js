const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.airpurifier.mb3';
  static name = 'Mi Air Purifier 3H';
  static image = 'https://cdn.awsde0.fds.api.mi-img.com/miio.files/developer_15504816557tej1pj6.png';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-mb3:2';
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
    const mode = this.properties['air-purifier:mode'];
    if (mode === 0) return 'auto';
    if (mode === 1) return 'sleep';
    if (mode === 2) return 'favorite';
    if (mode === 3) return 'none';
    return undefined;
  }

  getFanLevel() { // 1 - 3
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
    const filterTotal = this.properties['filter:filter-life-level'];
    const filterUsed = this.properties['filter:filter-used-time'];
    if (filterTotal > 0 && filterUsed >= 0) {
      return Math.max((1 - filterUsed / filterTotal) * 100, 0);
    }
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

  setMode(v) {
    if (v === 'auto') v = 0;
    else if (v === 'sleep') v = 1;
    else if (v === 'favorite') v = 2;
    else if (v === 'none') v = 3;
    return this.miotSetProperty('air-purifier:mode', v);
  }

  setFanLevel(v) { // 1-3
    return this.miotSetProperty('air-purifier:fan-level', v);
  }

  setBuzzer(v) {
    return this.miotSetProperty('alarm:alarm', v);
  }

  setLcdBrightness(v) { // 0-brightest, 1-glimmer, 2-led_closed
    return this.miotSetProperty('indicator-light:brightness', v);
  }

  setChildLock(v) {
    return this.miotSetProperty('physical-controls-locked:physical-controls-locked', v);
  }

};
