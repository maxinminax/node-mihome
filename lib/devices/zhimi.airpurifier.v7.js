const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.airpurifier.v7';
  static name = 'Mi Air Purifier Pro';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551944689505i5ubr.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power', // Power (on / off)
      'mode', // Mode (auto / silent / favorite)
      'favorite_level', // Favorite level (0-16)
      'temp_dec', // Temperature (x10)
      'humidity', // Humidity (%)
      'aqi', // Air Quality Index
      'average_aqi', // Average Air Quality Index
      'led', // Display status (on / off)
      'bright', // Illuminance
      'volume', // Sound volume (0-100)
      'filter1_life', // Filter life (%)
      'f1_hour', // Filter max life
      'f1_hour_used', // Filter hours used
      'motor1_speed', // Fan speed (RPM)
      'motor2_speed', // 2nd fan speed (RPM)
      'child_lock', // Child lock (on / off)
    ];
  }

  /**
   * Get power status
   * @return {boolean}
   */
  getPower() {
    return this.properties['power'] === 'on';
  }

  /**
   * Get mode
   * @return {'auto'|'silent'|'favorite'}
   */
  getMode() {
    return this.properties['mode'];
  }

  /**
   * Get favorite level
   * @returns {number} 0-16
   */
  getFavoriteLevel() {
    return this.properties['favorite_level'];
  }

  /**
   * Get temperature
   * @returns {number} in Celsius
   */
  getTemperature() {
    return this.properties['temp_dec'] / 10;
  }

  /**
   * Get humidity
   * @returns {number} %
   */
  getHumidity() {
    return this.properties['humidity'];
  }

  /**
   * Get Air Quality Index
   * @returns {number}
   */
  // eslint-disable-next-line camelcase
  getPM2_5() {
    return this.properties['aqi'];
  }

  /**
   * Get average Air Quality Index
   * @returns {number}
   */
  // eslint-disable-next-line camelcase
  getAveragePM2_5() {
    return this.properties['average_aqi'];
  }

  /**
   * Get display status
   * @returns {boolean}
   */
  getLed() {
    return this.properties['led'] === 'on';
  }

  /**
   * Get illuminance
   * @returns {number}
   */
  getLcdBrightness() {
    return this.properties['bright'];
  }

  /**
   * Get sound volume
   * @returns {number} 0-100
   */
  getVolume() {
    return this.properties['volume'];
  }

  /**
   * Get remaining filter life
   * @returns {number} %
   */
  getFilterRemaining() {
    return this.properties['filter1_life'];
  }

  /**
   * Get filter max life
   * @returns {number} hours
   */
  getFilterTotal() {
    return this.properties['f1_hour'];
  }

  /**
   * Get filter used time
   * @returns {number} hours
   */
  getFilterUsed() {
    return this.properties['f1_hour_used'];
  }

  /**
   * Get motor speed
   * @returns {number} RPM
   */
  getMotorSpeed() {
    return this.properties['motor1_speed'];
  }

  /**
   * Get 2nd motor speed
   * @returns {number} RPM
   */
  getMotorSpeed2() {
    return this.properties['motor2_speed'];
  }

  /**
   * Get child lock status
   * @returns {boolean}
   */
  getChildLock() {
    return this.properties['child_lock'] === 'on';
  }

  /**
   * Set power status
   * @param {boolean} v
   */
  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  /**
   * Set mode
   * @param {'auto'|'silent'|'favorite'} v
   */
  setMode(v) {
    return this.miioCall('set_mode', [v]);
  }

  /**
   * Set favorite level
   * @param {number} v 0-16
   */
  setFavoriteLevel(v) {
    return this.miioCall('set_level_favorite', [v]);
  }

  /**
   * Set display status
   * @param {boolean} v
   */
  setDisplay(v) {
    return this.miioCall('set_led', [v ? 'on' : 'off']);
  }

  /**
   * Set sound volume
   * @param {number} v 0-100
   */
  setVolume(v) { // 0-100
    return this.miioCall('set_volume', [v]);
  }

  /**
   * Set child lock
   * @param {boolean} v
   */
  setChildLock(v) {
    return this.miioCall('set_child_lock', [v ? 'on' : 'off']);
  }

};
