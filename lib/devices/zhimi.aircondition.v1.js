const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.aircondition.v1';
  static name = 'Smartmi Smart Air Conditioner';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551943901u5fhbldk.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power',
      'mode',
      'st_temp_dec',
      'temp_dec',
      'humidity',
      'volume_level',
      'lcd_level',
      'idle_timer',
      'open_timer',
      'speed_level',
      'vertical_end',
      'vertical_swing',
      'horizon_swing',
      'silent',
      'ele_quantity'];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getMode() {
    const { mode } = this.properties;
    if (mode === 'cooling') return 'cool';
    if (mode === 'heat') return 'heat';
    if (mode === 'wind') return 'wind';
    if (mode === 'arefaction') return 'dry';
    return undefined;
  }

  getTargetTemperature() {
    const targetTemperature = this.properties.st_temp_dec;
    if (targetTemperature > 0) return targetTemperature / 10;
    return undefined;
  }

  getTemperature() {
    const temperature = this.properties.temp_dec;
    if (temperature > 0) return temperature / 10;
    return undefined;
  }

  getHumidity() {
    const { humidity } = this.properties;
    if (humidity > 0) return humidity;
    return undefined;
  }

  getPowerCapacity() {
    const powerCapacity = this.properties.ele_quantity;
    if (powerCapacity > 0) return powerCapacity;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = this.properties.speed_level;
    if (fanLevel >= 0) return fanLevel + 1; // 0 - 5 -> 1 - 6
    return undefined;
  }

  getVolume() {
    const volume = this.properties.volume_level;
    if (volume > 0) return volume; // 1 - 7
    return undefined;
  }

  getVerticalSwing() {
    const verticalSwing = this.properties.vertical_swing;
    if (verticalSwing === 'on') return true;
    if (verticalSwing === 'off') return false;
    return undefined;
  }

  getHorizontalSwing() {
    const horizontalSwing = this.properties.horizontal_swing;
    if (horizontalSwing === 'on') return true;
    if (horizontalSwing === 'off') return false;
    return undefined;
  }

  getSleepMode() {
    const sleepMode = this.properties.silent;
    if (sleepMode === 'on') return true;
    if (sleepMode === 'off') return false;
    return undefined;
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setMode(v) {
    if (v === 'cool') v = 'cooling';
    else if (v === 'heat') v = 'heat';
    else if (v === 'wind') v = 'wind';
    else if (v === 'dry') v = 'arefaction';
    else return Promise.reject(new Error(`Mode ${v} is not supported`));
    return this.miioCall('set_mode', [v]);
  }

  setTargetTemperature(v) {
    return this.miioCall('set_temperature', [v * 10]);
  }

  setFanLevel(v) {
    return this.miioCall('set_spd_level', [v - 1]);
  }

  setVerticalSwing(v) {
    return this.miioCall('set_spd_level', [v ? 'on' : 'off']);
  }

  setHorizontalSwing(v) {
    return this.miioCall('set_horizon', [v ? 'on' : 'off']);
  }

  setVolume(v) { // 1-7
    return this.miioCall('set_horizon', [v]);
  }

  setLcdBrightness(v) {
    return this.miioCall('set_lcd_level', [v]);
  }

  setSleepMode(v) {
    return this.miioCall('set_silent', [v ? 'on' : 'off']);
  }

};
