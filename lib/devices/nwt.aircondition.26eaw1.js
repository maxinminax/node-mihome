const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'nwt.aircondition.26eaw1';
  static name = 'NWT Internet Portable Air Conditioner';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1578644370325XkfNikJ4.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=1INeFNGZq9V4wV/iRyCcRD7cXqo=';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:air-conditioner:0000A004:nwt-26eaw1:1';
    this._propertiesToMonitor = [
      'air-conditioner:on',
      'air-conditioner:mode',
      'air-conditioner:target-temperature',
      'fan-control:fan-level',
      'fan-control:vertical-swing',
      'environment:temperature',
      'alarm:alarm',
      'indicator-light:on',
      'physical-controls:physical-controls-on',
      'event-service:water-tank-full'];
  }

  getPower() {
    return this.properties['air-conditioner:on'];
  }

  getMode() {
    const mode = this.properties['air-conditioner:mode'];
    if (mode === 1) return 'cool';
    if (mode === 2) return 'dry';
    if (mode === 3) return 'wind';
    return undefined;
  }

  getTargetTemperature() {
    return this.properties['air-conditioner:target-temperature'];
  }

  getFanSwing() {
    return this.properties['fan-control:vertical-swing'];
  }

  getFanLevel() {
    return this.properties['fan-control:fan-level'];
  }

  getTemperature() {
    return this.properties['environment:temperature'];
  }

  getWaterTankFull() {
    return this.properties['event-service:water-tank-full'];
  }

  getBuzzer() {
    return this.properties['alarm:alarm'];
  }

  getLed() {
    return this.properties['indicator-light:on'];
  }

  getChildLock() {
    return this.properties['physical-controls:physical-controls-on'];
  }

  setPower(v) {
    return this.miotSetProperty('air-conditioner:on', v);
  }

  setMode(v) {
    if (v === 'cool') v = 1;
    else if (v === 'dry') v = 2;
    else if (v === 'wind') v = 3;
    else return Promise.reject(new Error(`Mode ${v} is not supported`));
    return this.miotSetProperty('air-conditioner:mode', v);
  }

  setTargetTemperature(v) {
    return this.miotSetProperty('air-conditioner:target-temperature', v);
  }

  setFanSwing(v) {
    return this.miotSetProperty('fan-control:vertical-swing', v);
  }

  setFanLevel(v) {
    return this.miotSetProperty('fan-control:fan-level', v);
  }

};
