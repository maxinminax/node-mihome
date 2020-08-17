const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.fridge.x4';
  static name = 'Viomi Internet refrigerator 21 face (side by side 450L)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1532399873w0ehtbuk.png';

  constructor(opts) {
    super({ ...opts, protocol: 'cloud' });

    this._propertiesToMonitor = ['Mode', 'RCSetTemp', 'FCSetTemp', 'RCSet', 'FilterLifeBase', 'FilterLife', 'Error', 'SmartCool', 'SmartFreeze', 'OutdoorTemp', 'IndoorTemp', 'StartDays'];
  }

  setPower(v) { // power colding zone
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

  setFreezeTemperature(v) {
    return this.miioCall('setFCSetTemp', [v]);
  }

  setColdTemperature(v) {
    return this.miioCall('setRCSetTemp', [v]);
  }

};
