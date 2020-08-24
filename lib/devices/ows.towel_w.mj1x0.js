const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'ows.towel_w.mj1x0';
  static name = 'Intelligent electric heating towel rack';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1592882758857aFAwK57c.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=Qd2GmopLgi0nbX+mjrm1DH2z++A=';

  async loadProperties(props) {
    try {
      const data = await this.getProperties([]);
      this._properties = data;
      this.emit('available', true);
      this.emit('properties', data);
    } catch (e) {
      this.emit('unavailable', e.message);
    }
  }

  getPower() {
    const power = this.properties[0];
    if (power === 1) return true;
    if (power === 0) return false;
    return undefined;
  }

  getMode() {
    const mode = this.properties[1];
    if (mode === 0) return 'dry';
    if (mode === 1) return 'warn';
    if (mode === 2) return 'antifreeze';
    if (mode === 3) return 'programming';
    return undefined;
  }

  getDryTargetTemperature() {
    const targetTemperature = parseInt(this.properties[2], 10);
    if (targetTemperature > 0) return targetTemperature / 2;
    return undefined;
  }

  getHeatTargetTemperature() {
    const targetTemperature = parseInt(this.properties[3], 10);
    if (targetTemperature > 0) return targetTemperature / 2;
    return undefined;
  }

  getTemperature() {
    const temperature = parseInt(this.properties[7], 10);
    if (temperature > 0) return temperature / 2;
    return undefined;
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 1 : 0]);
  }

  setMode(v) {
    if (v === 'dry') v = 0;
    else if (v === 'warn') v = 0;
    else if (v === 'antifreeze') v = 0;
    else if (v === 'programming') v = 0;
    else return Promise.reject(new Error(`Mode ${v} is not supported`));
    return this.miioCall('set_mode', [v]);
  }

  setDryTargetTemperature(v) {
    return this.miioCall('set_tempdry', [v * 2]);
  }

  setHeatTargetTemperature(v) {
    return this.miioCall('set_tempheat', [v * 2]);
  }

};
