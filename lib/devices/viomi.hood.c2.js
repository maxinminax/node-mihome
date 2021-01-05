const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.hood.c2';
  static name = 'Viomi Smart  Hood Cross 2';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15591199583vejh0cw.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'light_state',
      'run_time',
      'power_state', // 0 - off, 1 - delay off, 2 - on, 3 - cleaning
      'wind_state', // 0 - off, 1 - low, 16 - middle, 4 - high, 64 - unknown
      'link_state',
      'stove1_data',
      'stove2_data',
      'battary_life',
      'run_status',
      'left_time', // in seconds
      'run_status', // 16 - communication error, 17 - push rod motor error
      'poweroff_delaytime',
      'fixed_time', // 3 - strong, 4 - prepare, 5 - glass, 6 - degerming, 250 - dry
      'ble_slave_info'];
  }

  getState() {
    const state = this.properties.power_state;
    if (state === 0) return 'off';
    if (state === 1) return 'delay off';
    if (state === 2) return 'on';
    if (state === 3) return 'cleaning';
    return undefined;
  }

  getLightPower() {
    const lightPower = this.properties.light_state;
    if (lightPower === 1) return true;
    if (lightPower === 0) return false;
    return undefined;
  }

  getPower() {
    const power = this.properties.power_state;
    if (power === 2 || power === 1) return true;
    if (power === 0 || power === 3) return false;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = this.properties.wind_state;
    if (fanLevel === 0) return 0;
    if (fanLevel === 1) return 1;
    if (fanLevel === 16) return 2;
    if (fanLevel === 4) return 3;
    return undefined;
  }

  getBattery() {
    const battery = parseInt(this.properties.battary_life, 10);
    if (Number.isInteger(battery)) return battery;
    return undefined;
  }

  setLightPower(v) {
    return this.miioCall('set_light', [v ? 1 : 0]);
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 1 : 0]);
  }

  setFanLevel(v) {
    if (v === 2) v = 16;
    if (v === 3) v = 4;
    return this.miioCall('set_wind', [v]);
  }

};
