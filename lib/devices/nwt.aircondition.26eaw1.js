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

  setPower(v) {
    return this.miotSetProperty('air-conditioner:on', v);
  }

  setMode(v) {
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
