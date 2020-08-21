const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'yunmi.waterpuri.s4';
  static name = 'Viomi smart water purifier S2(500G)';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1594102683347TvKz9PhV.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=g51SGugwU9p30XBAQX5efu65FiY=';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'run_status',
      'f1_totalflow',
      'f1_usedflow',
      'f1_totaltime',
      'f1_usedtime',
      'f2_totalflow',
      'f2_usedflow',
      'f2_totaltime',
      'f2_usedtime',
      'tds_in',
      'tds_out',
      'rinse',
      'temperature',
      'tds_warn_thd',
      'tds_out_avg'];
  }

  getState() {
    return this.properties.run_status;
  }

  getFilter1Remaining() {
    const f1Used = parseInt(this.properties.f1_usedtime, 10);
    const f1Total = parseInt(this.properties.f1_totaltime, 10);
    if (f1Used >= 0 && f1Total > 0) {
      return Math.max(((f1Total - f1Used) / f1Total) * 100, 0);
    }
    return undefined;
  }

  getFilter2Remaining() {
    const f2Used = parseInt(this.properties.f2_usedtime, 10);
    const f2Total = parseInt(this.properties.f2_totaltime, 10);
    if (f2Used >= 0 && f2Total > 0) {
      return Math.max(((f2Total - f2Used) / f2Total) * 100, 0);
    }
    return undefined;
  }

  getTDSIn() {
    const tds = parseInt(this.properties.tds_in, 10);
    if (tds >= 0) return tds;
    return undefined;
  }

  getTDSOut() {
    const tds = parseInt(this.properties.tds_out, 10);
    if (tds >= 0) return tds;
    return undefined;
  }

  getTemperature() {
    const temperature = parseInt(this.properties.temperature, 10);
    if (Number.isInteger(temperature)) return temperature;
    return undefined;
  }

};
