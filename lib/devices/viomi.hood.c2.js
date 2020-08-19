const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.hood.c2';
  static name = 'Viomi Smart  Hood Cross 2';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_15591199583vejh0cw.png';

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

  setLightPower(v) {
    return this.miioCall('set_light', [v ? 1 : 0]);
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 1 : 0]);
  }

  setFanLevel(v) {
    return this.miioCall('set_wind', [v]);
  }

};
