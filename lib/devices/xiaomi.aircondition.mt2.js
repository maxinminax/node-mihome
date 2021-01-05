const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'xiaomi.aircondition.mt2';
  static name = 'Mi Smart Air Conditioner X (1.5HP / Inverter / New China Energy Label Level 1)';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1587701173446w2axlRBx.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=0xPA4O8OsrjvQmKwfny3+BSOX/4=';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:bath-heater:0000A028:viomi-v3:1';
    this._propertiesToMonitor = [
      'air-conditioner:on',
      'air-conditioner:mode',
      'air-conditioner:fault',
      'air-conditioner:target-temperature',
      'air-conditioner:eco',
      'air-conditioner:heater',
      'air-conditioner:dryer',
      'air-conditioner:sleep-mode',
      'air-conditioner:soft-wind',
      'fan-control:fan-level',
      'fan-control:horizontal-swing',
      'fan-control:vertical-swing',
      'environment:temperature',
      'alarm:alarm',
      'indicator-light:on',
      'electricity:electricity',
      'electricity:elec-count',
      'maintenance:clean',
      'maintenance:examine',
      // 'maintenance:error',
      'maintenance:running-duration'
    ];
  }

  getPower() {
    return this.properties['air-conditioner:on'];
  }

  getMode() {
    const mode = this.properties['air-conditioner:mode'];
    if (mode === 2) return 'cool';
    if (mode === 3) return 'dry';
    if (mode === 4) return 'wind';
    if (mode === 5) return 'heat';
    return undefined;
  }

  getEco() {
    return this.properties['air-conditioner:eco'];
  }

  getHeater() {
    return this.properties['air-conditioner:heater'];
  }

  getDryer() {
    return this.properties['air-conditioner:dryer'];
  }

  getSleepMode() {
    return this.properties['air-conditioner:sleep-mode'];
  }

  getTargetTemperature() {
    return this.properties['air-conditioner:target-temperature'];
  }

  getTemperature() {
    return this.properties['environment:temperature'];
  }

  getPowerCapacity() {
    return this.properties['electricity:electricity'];
  }

  getFanLevel() {
    return this.properties['fan-control:fan-level']; // 0 (zero) is auto
  }

  getVerticalSwing() {
    return this.properties['fan-control:vertical-swing'];
  }

  getHorizontalSwing() {
    return this.properties['fan-control:horizontal-swing'];
  }

  getBuzzer() {
    return this.properties['alarm:alarm'];
  }

  getLcdBrightness() {
    return this.properties['indicator-light:on'];
  }

  getClean() {
    return this.properties['maintenance:clean'];
  }

  getExamine() {
    return this.properties['maintenance:examine'];
  }

  getMaintenanceDurtaion() {
    return this.properties['maintenance:clearunning-durationn'];
  }

  setPower(v) {
    return this.properties('air-conditioner:on', v);
  }

  setMode(v) {
    if (v === 2) v = 'cool';
    else if (v === 3) v = 'dry';
    else if (v === 4) v = 'wind';
    else if (v === 5) v = 'heat';
    return this.miotSetProperty('air-conditioner:mode', v);
  }

  setEco(v) {
    return this.miotSetProperty('air-conditioner:eco', v);
  }

  setHeater(v) {
    return this.miotSetProperty('air-conditioner:heater', v);
  }

  setDryer(v) {
    return this.miotSetProperty('air-conditioner:dryer', v);
  }

  setSleepMode(v) {
    return this.miotSetProperty('air-conditioner:sleep-mode', v);
  }

  setTarsetTemperature(v) {
    return this.miotSetProperty('air-conditioner:tarset-temperature', v);
  }

  setFanLevel(v) {
    return this.miotSetProperty('fan-control:fan-level', v); // 0 (zero) is auto
  }

  setVerticalSwing(v) {
    return this.miotSetProperty('fan-control:vertical-swing', v);
  }

  setHorizontalSwing(v) {
    return this.miotSetProperty('fan-control:horizontal-swing', v);
  }

  setBuzzer(v) {
    return this.miotSetProperty('alarm:alarm', v);
  }

  setLcdBrightness(v) {
    return this.miotSetProperty('indicator-light:on', v);
  }

  setClean(v) {
    return this.miotSetProperty('maintenance:clean', v);
  }

  setExamine(v) {
    return this.miotSetProperty('maintenance:examine', v);
  }

};
