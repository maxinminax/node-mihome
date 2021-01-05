const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'lumi.airer.acn012';
  static name = 'Aqara Smart Clothes Drying Rack';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1531966234enefbxt7.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'light',
      'dry_remaining_time',
      'dry_status',
      'airer_state',
      'en_night_tip_light',
      'level',
      'limit_configured',
      'limit_locked',
      'run_time'];
  }

  async getProperties(props) {
    props = ['lumi.0', ...props];
    const result = this._miotSpec
      ? await this.miotGetProperties(props) : await this.miioGetProperties(props);
    return result;
  }

  getLightPower() {
    const lightPower = this.properties.light;
    if (lightPower === 'on') return true;
    if (lightPower === 'off') return false;
    return undefined;
  }

  getWindDryPower() {
    const dryStatus = this.properties.dry_status;
    if (dryStatus === 'winddry') return true;
    if (dryStatus === 'off') return false;
    return undefined;
  }

  getHotDryPower() {
    const dryStatus = this.properties.dry_status;
    if (dryStatus === 'hotdry') return true;
    if (dryStatus === 'off') return false;
    return undefined;
  }

  getTimeRemaining() {
    const timeRemaining = parseInt(this.properties.dry_remaining_time, 10);
    if (timeRemaining >= 0) return timeRemaining;
    return undefined;
  }

  getLevel() {
    const level = parseInt(this.properties.level, 10);
    if (level >= 0) return level;
    return undefined;
  }

  getState() {
    return this.properties.airer_state;
  }

  setLightPower(v) {
    return this.miioCall('toggle_light', [v ? 'on' : 'off']);
  }

  setWindDryPower(v, time = 1800) {
    const minutes = Math.floor(1800 / 60);
    const params = v ? ['start_winddry', minutes] : ['stop_winddry'];
    return this.miioCall('control_device', params);
  }

  setHotDryPower(v, time = 1800) {
    const minutes = Math.floor(1800 / 60);
    const params = v ? ['start_hotdry', minutes] : ['stop_hotdry'];
    return this.miioCall('control_device', params);
  }

  setState(v) {
    return this.miioCall('toggle_device', [v]);
  }

  setUp() {
    return this.setState('up');
  }

  setDown() {
    return this.setState('down');
  }

  setStop() {
    return this.setState('stop');
  }

};
