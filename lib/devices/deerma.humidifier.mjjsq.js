const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'deerma.humidifier.mjjsq';
  static name = 'Xiaomi Mi Smart Antibacterial Humidifier';
  static image = 'https://loveair.pl/public/products/small/nawilzacz-xiaomi-mi-smart-antibacterial-humidifier-1606910672.png';

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

  getMode() {
    const mode = this.properties['Humidifier_Gear'];
    if (mode === 1) return 'low';
    if (mode === 2) return 'medium';
    if (mode === 3) return 'high';
    if (mode === 4) return 'humidity';
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

  setMode(v) {
    if (v === 'low') {
      return this.miioCall('Set_HumidifierGears', [1]);
    }
    if (v === 'medium') {
      return this.miioCall('Set_HumidifierGears', [2]);
    }
    if (v === 'high') {
      return this.miioCall('Set_HumidifierGears', [3]);
    }
    if (v === 'humidity') {
      return this.miioCall('Set_HumidifierGears', [4]);
    }
    return Promise.reject(new Error(`Invalid mode: ${v}`));
  }

  setTargetHumidity(v) {
    if ((v <= 70) || (v >= 40)) {
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
