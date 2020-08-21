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
      // 'fastwash_drying',
      // 'fastwash_dry_t',
      'temp_info'
    ];
  }

  getPower() {
    const status = this.properties.wash_status;
    if (status > 0) return true;
    if (status === 0) return false;
    return undefined;
  }

  getState() {
    return this.properties.wash_process;
  }

  getLdjState() {
    const ldjState = parseInt(this.properties.ldj_state, 10);
    if (ldjState === 1) return true;
    if (ldjState === 0) return false;
    return undefined;
  }

  getSaltState() {
    const saltState = parseInt(this.properties.salt_state, 10);
    if (saltState === 1) return true;
    if (saltState === 0) return false;
    return undefined;
  }

  getMode() {
    return this.properties.program;
  }

  getCustomMode() {
    return this.properties.program;
  }

  getTimeRemaining() {
    const timeRemaining = parseInt(this.properties.left_time, 10);
    if (timeRemaining >= 0) return timeRemaining;
    return undefined;
  }

  getTemperature() {
    return this.properties.wash_temp;
  }

  getChildLock() {
    const childLock = this.properties.child_lock;
    if (childLock === 1) return true;
    if (childLock === 0) return false;
    return undefined;
  }

  setMode(v) {
    return this.miioCall('set_program', [v]);
  }

  setCustomMode(v) {
    return this.miioCall('set_custom_program', [v]);
  }

  setClean(v) {
    return this.miioCall('set_wash_action', [1]);
  }

  setStop(v) {
    return this.miioCall('set_wash_action', [0]);
  }

};
