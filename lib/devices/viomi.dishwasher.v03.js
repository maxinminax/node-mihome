const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.dishwasher.v03';
  static name = 'Viomi Smart Dish Washer（Build-in）';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1550041796hetf6yfp.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'child_lock',
      'program', // 0 - standard, 1 - saver, 2 - fast, 3 - custom
      'wash_status',
      'wash_process', // 0 - free, 1 - prewash, 2 - mainwash, 3 - reclean, 4 - swash, 5 - dry, 6 - finished
      'ldj_state',
      'salt_state',
      'bespeak_h',
      'bespeak_min',
      'bespeak_status',
      'left_time', // in seconds
      'run_status',
      'wash_temp',
      'custom_program', // 3 - strong, 4 - prepare, 5 - glass, 6 - degerming, 250 - dry
      'fastwash_drying',
      'fastwash_dry_t',
      'temp_info',
      'flashdryInterval',
      'waterHardness',
      'city'];
  }

  setMode(v) {
    return this.miioCall('set_program', [v]);
  }

  setCustomMode(v) {
    return this.miioCall('set_custom_program', [v]);
  }

  clean(v) {
    return this.miioCall('set_wash_action', [1]);
  }

  stop(v) {
    return this.miioCall('set_wash_action', [0]);
  }

};
