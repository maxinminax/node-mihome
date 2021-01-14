const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'deerma.humidifier.mjjsq';
  static name = 'Mi Smart Humidifier';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1542871940fn9a3b3y.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'Humidifier_Gear',
      'Humidity_Value',
      'HumiSet_Value',
      'Led_State',
      'OnOff_State',
      'TemperatureValue',
      'TipSound_State',
      'waterstatus',
      'watertankstatus'
    ];
  }

  getPower() {
    const power = this.properties['OnOff_State'];
    if (power === 1) return true;
    if (power === 0) return false;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = this.properties['Humidifier_Gear'];
    if (mode > 0) return fanLevel;
    return undefined;
  }

  getHumidity() {
    return this.properties['Humidity_Value'];
  }

  getTargetHumidity() {
    return this.properties['HumiSet_Value'];
  }

  getLed() {
    const power = this.properties['Led_State'];
    if (power === 1) return true;
    if (power === 0) return false;
    return undefined;
  }

  getTemperature() {
    return this.properties['TemperatureValue'];
  }

  getBuzzer() {
    const buzzer = this.properties['TipSound_State'];
    if (buzzer === 1) return true;
    if (buzzer === 0) return false;
    return undefined;
  }

  getWaterLevel() {
    return this.properties['waterstatus'] * 100;
  }

  getWaterTank() {
    const waterTank = this.properties['watertankstatus'];
    if (waterTank === 1) return true;
    if (waterTank === 0) return false;
    return undefined;
  }

  setPower(v) {
    return this.miioCall('Set_OnOff', [v ? 1 : 0]);
  }

  setFanLevel(v) {
    if (v >= 1 && v <= 4) {
      return this.miioCall('Set_HumidifierGears', [v]);
    }
    return Promise.reject(new Error(`Invalid mode: ${v}`));
  }

  setTargetHumidity(v) {
    if ([40, 50, 60, 70].includes(v)) {
      return this.miioCall('Set_HumiValue', [v]);
    }
    return Promise.reject(new Error(`Invalid target humidity: ${v}`));
  }

  setLed(v) {
    return this.miioCall('SetLedState', [v ? 1 : 0]);
  }

  setBuzzer(v) {
    return this.miioCall('SetTipSound_Status', [v ? 1 : 0]);
  }
};
