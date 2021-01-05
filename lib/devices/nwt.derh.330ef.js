const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'nwt.derh.330ef';
  static name = 'NWT Internet Dehumidifier 30L';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1566907639xeqcwivl.png';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:dehumidifier:0000A02D:nwt-330ef:1';
    this._propertiesToMonitor = [
      'dehumidifier:on',
      'dehumidifier:mode',
      'dehumidifier:target-humidity',
      'environment:relative-humidity',
      'alarm:alarm',
      'indicator-light:on',
      'physical-controls-locked:physical-controls-locked',
      'event-service:water-tank-status'];
  }

  getPower() {
    return this.properties['dehumidifier:on'];
  }

  getMode() {
    return this.properties['dehumidifier:mode'];
  }

  getTargetHumidity() {
    return this.properties['dehumidifier:target-humidity'];
  }

  getHumidity() {
    return this.properties['environment:relative-humidity'];
  }

  getBuzzer() {
    return this.properties['alarm:alarm'];
  }

  getLed() {
    return this.properties['indicator-light:on'];
  }

  getChildLock() {
    return this.properties['physical-controls-locked:physical-controls-locked'];
  }

  getWaterTankFull() {
    return this.properties['event-service:water-tank-status'];
  }

  setPower(v) {
    return this.miotSetProperty('dehumidifier:on', v);
  }

  setMode(v) {
    return this.miotSetProperty('dehumidifier:mode', v);
  }

  setTargetHumidity(v) {
    return this.miotSetProperty('dehumidifier:target-humidity', v);
  }

  setFanLevel(v) {
    return this.miotSetProperty('dehumidifier:fan-level', v);
  }

};
