const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.humidifier.cb1';
  static name = 'Smartmi Evaporative Humidifier';
  static image =
    'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1566881006690Xccq6g7F.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;Expires=9223372036854775807&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;Signature=hGrzbHprrc2iBCFqLjolW7fR4b8=';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'limit_hum',
      'power',
      'humidity',
      'temperature',
      'buzzer',
      'led',
      'depth',
      'dry',
      'child_lock',
      'mode',
    ];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = parseInt(this.properties['mode'], 10);
    if (fanLevel >= 0) return fanLevel;
    return undefined;
  }

  getTartgetHumidity() {
    return this.properties['limit_hum'];
  }

  getWaterLevel() {
    return this.properties['depth'];
  }

  getTemperature() {
    return this.properties['temperature'];
  }

  getHumidity() {
    return this.properties['humidity'];
  }

  getMode() {
    const { dry } = this.properties;
    if (dry === 'on') return 'dry';
    if (dry === 'off') return 'humidify';
    return undefined;
  }

  getChildLock() {
    const childLock = this.properties['child_lock'];
    if (childLock === 'on') return true;
    if (childLock === 'off') return false;
    return undefined;
  }

  getLedBrightness() {
    const led = this.properties['led_b'];
    if (led >= 0) return led;
    return undefined;
  }

  getBuzzer() {
    const { buzzer } = this.properties;
    if (buzzer === 'on') return true;
    if (buzzer === 'off') return false;
    return undefined;
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setBuzzer(v) {
    return this.miioCall('set_buzzer', [v]);
  }

  setFanLevel(v) {
    return this.miioCall('set_mode', [v]);
  }

  setTargetHumidity(v) {
    if ([30, 40, 50, 60, 70, 80].includes(v)) {
      return this.miioCall('set_limit_hum', [v]);
    }
    return Promise.reject(new Error(`Invalid target humidity: ${v}`));
  }

  setLedBrightness(v) {
    return this.miioCall('set_led_b', [String(v)]);
  }

  setChildLock(v) {
    return this.miioCall('set_child_lock', [v ? 'on' : 'off']);
  }

  setMode(v) {
    if (v === 'dry') {
      return this.miioCall('set_dry', ['on']);
    }
    if (v === 'humidify') {
      return this.miioCall('set_dry', ['off']);
    }
    return Promise.reject(new Error(`Invalid mode: ${v}`));
  }

};