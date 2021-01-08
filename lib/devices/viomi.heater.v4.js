const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.heater.v4';
  static name = 'Viomi Kick-Line heater Pro2';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1601456647124pMb0OTWj.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=22zs4EuHdwGZgcbKrNJYey/RBFw=';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:bath-heater:0000A028:viomi-v3:1';
    this._propertiesToMonitor = [
      'heater:on',
      'heater:fault',
      'heater:status',
      'heater:mode',
      'heater:target-temperature',
      'heater:temperature',
      'heater:working-time',
      'countdown:countdown-time',
      'humidifier:on',
      'humidifier:fault',
      'screen:on',
      'alarm:alarm'
    ];
  }

  getPower() {
    return this.properties['heater:on'];
  }

  getStatus() {
    const status = this.properties['heater:status'];
    if (status === 0) return 'Idle';
    if (status === 1) return 'Busy';
    if (status === 2) return 'Appointment';
    return undefined;
  }

  getMode() {
    return this.properties['heater:mode'];
  }

  getTargetTemperature() { // 5 - 35
    return this.properties['heater:target-temperature'];
  }

  getTemperature() {
    return this.properties['heater:temperature'];
  }

  getWorkingTime() {
    return this.properties['heater:working-time'];
  }

  getTimer() {
    return this.properties['countdown:countdown-timer'];
  }

  getHumidifierPower() {
    return this.properties['humidifier:on'];
  }

  getLed() {
    return this.properties['screen:on'];
  }

  getBuzzer() {
    return this.properties['alarm:alarm'];
  }

  setPower(v) {
    return this.miotSetProperty('heater:mode', v);
  }

  setMode(v) {
    return this.miotSetProperty('heater:mode', v);
  }

  setTargetTemperature(v) {
    return this.miotSetProperty('heater:target-temperature', v);
  }

  setHumidifierPower(v) {
    return this.miotSetProperty('humidifier:mode', v);
  }

};
