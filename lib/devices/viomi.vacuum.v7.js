const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.vacuum.v7';
  static name = 'Mi Robot Vacuum-Mop P';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_156211621715fdn2i1.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'run_state',
      'error',
      'battary_life',
      'box_type',
      'mop_type',
      's_time',
      's_area',
      'suction_grade',
      'water_grade',
      'is_mop', // mode
      'v_state', // volume
      'side_brush_hours',
      'main_brush_hours',
      'hypa_hours',
      'mop_hours',
      'side_brush_life',
      'main_brush_life',
      'hypa_life',
      'mop_life'];
  }

  charge() {
    return this.miioCall('set_charge', [1]);
  }

  uncharge() {
    return this.miioCall('set_charge', [0]);
  }

  clean() {
    return this.miioCall('set_mode_withroom', [0, 1, 0]);
  }

  pause() {
    return this.miioCall('set_mode_withroom', [0, 2, 0]);
  }

  stop() {
    return this.sendCharge();
  }

  setFanLevel(v) { // 0 - 1 - 2
    return this.miioCall('set_suction', [v]);
  }

  setWaterLevel(v) { // 11 - 12 - 13
    return this.miioCall('set_suction', [v]);
  }

  setMute(v) {
    return this.miioCall('set_voice', [v ? 0 : 1, 5]);
  }

  setVolume(v) { // 1 - 100
    return this.miioCall('set_voice', [1, v / 10]);
  }

  setLanguage(v) { // 2: en, 1: cn
    this.call('set_language', [v]);
  }

  find() {
    this.call('set_resetpos', []);
  }

};
