const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.bhf_light.v3';
  static name = 'Viomi Smart Bath Heater PRO';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1572231814166zuSX5G3s.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=QXTFfJcX4JRhwkmzslJ0KdX6sIY=';

  constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:bath-heater:0000A028:viomi-v3:1';
    this._propertiesToMonitor = [
      'light:on',
      'light:color-temperature',
      'light:brightness',
      'ptc-bath-heater:on',
      'ptc-bath-heater:target-temperature',
      'fan-control:mode', // None, Bath, Cool, Dry
      'fan-control:indoor-temperature',
      'fan-control:relative-humidity',
      'fan-control:motor-reverse',
      'fan-control:massage-manipulation',
      'fan-control:horizontal-swing'];
  }

  setPower(v) { // start auto
    return this.miotSetProperty('fan-control:massage-manipulation', v);
  }

  setMode(v) {
    return this.miotSetProperty('fan-control:mode', v);
  }

  setFanPower(v) {
    return this.miotSetProperty('fan-control:swing', v);
  }

  setReveseFanPower(v) {
    return this.miotSetProperty('fan-control:motor-reverse', v);
  }

  setLightPower(v) {
    return this.miotSetProperty('light:on', v);
  }

  setColorTemperature(v) {
    return this.miotSetProperty('light:color-temperature', v);
  }

  setBrightness(v) {
    return this.miotSetProperty('light:brightness', v);
  }

  setHeaterPower(v) {
    return this.miotSetProperty('ptc-bath-heater:on', v);
  }

  setTargetTemperature(v) {
    return this.miotSetProperty('ptc-bath-heater:target-temperature', v);
  }

};
