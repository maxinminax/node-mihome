const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.fridge.x4';
  static name = 'Viomi Internet refrigerator 21 face (side by side 450L)';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1532399873w0ehtbuk.png';

  constructor(opts) {
    super({ ...opts, protocol: 'cloud' });

    this._propertiesToMonitor = [
      'Mode',
      'RCSetTemp',
      'FCSetTemp',
      'RCSet',
      'FilterLifeBase',
      'FilterLife',
      'Error',
      'SmartCool',
      'SmartFreeze',
      'OutdoorTemp',
      'IndoorTemp',
      'StartDays',
    ];
  }

  getMode() {
    return this.properties.Mode;
  }

  getPower() {
    const power = this.properties.RCSet;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getFreezeTargetTemperature() {
    const freezeTargetTemperature = this.properties.FCSetTemp;
    if (freezeTargetTemperature > 0) return freezeTargetTemperature;
    return undefined;
  }

  getCoolTargetTemperature() {
    const coolTargetTemperature = this.properties.FCSetTemp;
    if (coolTargetTemperature > 0) return coolTargetTemperature;
    return undefined;
  }

  getSmartFreeze() {
    const smartFreeze = this.properties.SmartFreeze;
    if (smartFreeze === 'on') return true;
    if (smartFreeze === 'off') return false;
    return undefined;
  }

  getSmartCool() {
    const smartCool = this.properties.SmartCool;
    if (smartCool === 'on') return true;
    if (smartCool === 'off') return false;
    return undefined;
  }

  getFilterRemaining() {
    const filterLife = parseInt(this.properties.FilterLife, 10);
    const filterLifeBase = parseInt(this.properties.FilterLifeBase, 10);
    if (filterLife >= 0 && filterLifeBase > 0) {
      return Math.max((1 - filterLife / filterLifeBase) * 100, 0);
    }
    return undefined;
  }

  setPower(v) {
    // power colding zone
    return this.miioCall('setRCSet', [v ? 'on' : 'off']);
  }

  setMode(v) {
    this.miioCall('setMode', [v]);
  }

  setSmartFreeze(v) {
    return this.miioCall('setSmartFreeze', [v ? 'on' : 'off']);
  }

  setSmartCool(v) {
    return this.miioCall('setSmartCool', [v ? 'on' : 'off']);
  }

  setFreezeTargetTemperature(v) {
    return this.miioCall('setFCSetTemp', [v]);
  }

  setCoolTargetTemperature(v) {
    return this.miioCall('setRCSetTemp', [v]);
  }

};
