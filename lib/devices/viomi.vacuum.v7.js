const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.vacuum.v7';
  static name = 'Mi Robot Vacuum-Mop P';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_156211621715fdn2i1.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'run_state',
      'err_state',
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

  getState() {
    const state = parseInt(this.properties.run_state, 10);
    const battery = parseInt(this.properties.battary_life, 10);
    /* 0 - Idle not docked
     * 1 - Idle
     * 2 - Pause
     * 3 - Cleaning
     * 4 - Returning
     * 5 - Docked
     * 6 - Cleaning and mopping
     * 7 - Mopping
     */
    if (state === 5 && battery < 100) return 'charging';
    if (state === 5) return 'docked';
    if (state === 3 || state === 6 || state === 7) return 'cleaning';
    if (state >= 0) return 'stopped';
    return undefined;
  }

  getMode() {
    const mode = parseInt(this.properties.is_mop, 10);
    if (mode === 0) return 'vacuum';
    if (mode === 1) return 'vacuum-mop';
    if (mode === 2) return 'mop';
    return undefined;
  }

  getFanLevel() {
    const fanLevel = parseInt(this.properties.suction_grade, 10);
    if (fanLevel >= 0) return fanLevel + 1; // 0 - 3 -> 1 - 4
    return undefined;
  }

  getWaterLevel() {
    const waterLevel = parseInt(this.properties.water_grade, 10);
    if (waterLevel >= 11) return waterLevel - 10; // 11 - 13 -> 1 - 3
    return undefined;
  }

  getBattery() {
    const battery = this.properties.battary_life;
    if (Number.isInteger(battery)) return battery;
    return undefined;
  }

  getVolume() {
    const volume = parseInt(this.properties.v_state, 10);
    if (volume > 0) return volume * 10;
    return undefined;
  }

  getSideBrushRemaining() {
    const sideBrushTotal = parseInt(this.properties.side_brush_hours, 10);
    const sideBrushUsed = parseInt(this.properties.side_brush_life, 10);

    if (sideBrushTotal >= 0 && sideBrushUsed) {
      return Math.max(((sideBrushUsed - sideBrushTotal) / sideBrushUsed) * 100, 0);
    }
    return undefined;
  }

  getMainBrushRemaining() {
    const mainBrushTotal = parseInt(this.properties.main_brush_hours, 10);
    const mainBrushUsed = parseInt(this.properties.main_brush_life, 10);

    if (mainBrushTotal >= 0 && mainBrushUsed) {
      return Math.max(((mainBrushUsed - mainBrushTotal) / mainBrushUsed) * 100, 0);
    }
    return undefined;
  }

  getHypaRemaining() {
    const hypaTotal = parseInt(this.properties.hypa_hours, 10);
    const hypaUsed = parseInt(this.properties.hypa_life, 10);

    if (hypaTotal >= 0 && hypaUsed) {
      return Math.max(((hypaUsed - hypaTotal) / hypaUsed) * 100, 0);
    }
    return undefined;
  }

  getMopRemaining() {
    const mopTotal = parseInt(this.properties.mop_hours, 10);
    const mopUsed = parseInt(this.properties.mop_life, 10);

    if (mopTotal >= 0 && mopUsed) {
      return Math.max(((mopUsed - mopTotal) / mopUsed) * 100, 0);
    }
    return undefined;
  }

  setCharge(v) {
    return this.miioCall('set_charge', [v ? 1 : 0]);
  }

  setClean() {
    return this.miioCall('set_mode_withroom', [0, 1, 0]);
  }

  setPause() {
    return this.miioCall('set_mode_withroom', [0, 2, 0]);
  }

  setStop() {
    return this.charge();
  }

  setMode(v) {
    if (v === 'vacuum') v = 0;
    else if (v === 'vacuum-mop') v = 1;
    else if (v === 'mop') v = 2;
    return this.miioCall('set_mop', [v]);
  }

  setFanLevel(v) {
    return this.miioCall('set_suction', [v - 1]);
  }

  setWaterLevel(v) {
    return this.miioCall('set_suction', [v + 10]);
  }

  setMute(v) {
    return this.miioCall('set_voice', [v ? 0 : 1, 5]);
  }

  setVolume(v) { // 1 - 100
    return this.miioCall('set_voice', [1, v / 10]);
  }

  setLanguage(v) {
    if (v === 'cn') v = 1;
    else if (v === 'en') v = 2;
    this.call('set_language', [v]);
  }

  find() {
    this.call('set_resetpos', []);
  }

};
