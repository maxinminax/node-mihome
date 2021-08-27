const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.airpurifier.m1';
  static name = 'Mi Air Purifier 2';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15470144879uw2ei4h.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power',
      'mode',
      'favorite_level',
      'temp_dec',
      'humidity',
      'aqi',
      'buzzer',
      'led',
      'filter1_life',
      'f1_hour',
      'f1_hour_used',
      'child_lock'
    ];
  }

  getPower() {
    return this.properties['power'] === 'on';
  }

  getMode() {
    return this.properties['mode'];
  }

  getFavoriteLevel() {
    return this.properties['favorite_level'];
  }

  getTemperature() {
    return this.properties['temp_dec'] / 10;
  }

  getHumidity() {
    return this.properties['humidity'];
  }

  getPM2_5() {
    return this.properties['aqi'];
  }

  getAveragePM2_5() {
    return this.properties['average_aqi'];
  }

  getLed() {
    return this.properties['led'] === 'on';
  }

  getLedB() {
    return this.properties['led_b'];
  }

  getBuzzer() {
    return this.properties['buzzer'] === 'on';
  }

  getFilterRemaining() {
    return this.properties['filter1_life'];
  }

  getFilterTotal() {
    return this.properties['f1_hour'];
  }

  getFilterUsed() {
    return this.properties['f1_hour_used'];
  }

  getMotorSpeed() {
    return this.properties['motor1_speed'];
  }

  getChildLock() {
    return this.properties['child_lock'] === 'on';
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setMode(v) {
    return this.miioCall('set_mode', [v]);
  }

  setFavoriteLevel(v) {
    return this.miioCall('set_level_favorite', [v]);
  }

  setLed(v) {
    return this.miioCall('set_led', [v ? 'on' : 'off']);
  }

  setLedB(v) {
    return this.miioCall('set_led_b', [v]);
  }

  setBuzzer(v) {
    return this.miioCall('set_buzzer', [v ? 'on' : 'off']);
  }

  setChildLock(v) {
    return this.miioCall('set_child_lock', [v ? 'on' : 'off']);
  }

};