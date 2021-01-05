const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.oven.so1';
  static name = 'VIOMI Internet steaming and baking all-in-one machine king (embedded)';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1559200234f6m0l1sk.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'hwInfo',
      'swInfo',
      'error',
      'dishId',
      'dishName',
      'status',
      'mode',
      'workTime',
      'temp',
      'leftTime',
      'waterTank',
      'prepareTime',
      'doorIsOpen',
      'tempSetZ',
      'timeSetZ',
      'tempSetK',
      'timeSetK'
    ];
  }

  getPower() {
    const { status } = this.properties;
    if (status > 0) return true;
    if (status === 0) return false;
    return undefined;
  }

  getMode() {
    const mode = parseInt(this.properties.mode, 10);
    if (mode >= 0) return mode;
    return undefined;
  }

  getState() {
    const state = this.properties.status;
    if (state === 0) return 'Idle';
    if (state === 1) return 'Cooking';
    if (state === 2) return 'Pausing';
    if (state === 3) return 'Reserved';
    if (state === 4) return 'Finished';
    return undefined;
  }

  getWorkTime() {
    const workTime = parseInt(this.properties.workTime, 10);
    if (workTime >= 0) return workTime;
    return undefined;
  }

  getRemainingTime() {
    const remainingTime = parseInt(this.properties.leftTime, 10);
    if (remainingTime >= 0) return remainingTime;
    return undefined;
  }

  getPrepareTime() {
    const prepareTime = parseInt(this.properties.prepareTime, 10);
    if (prepareTime >= 0) return prepareTime;
    return undefined;
  }

  getWaterTank() {
    const waterTank = parseInt(this.properties.waterTank, 10);
    if (waterTank === 1) return true;
    if (waterTank === 0) return false;
    return undefined;
  }

  getOpened() {
    const opened = parseInt(this.properties.doorIsOpen, 10);
    if (opened === 1) return true;
    if (opened === 0) return false;
    return undefined;
  }

  getSteamingTargetTemperature() {
    const targetTemperature = parseInt(this.properties.tempSetZ, 10);
    if (Number.isInteger(targetTemperature)) return targetTemperature;
    return undefined;
  }

  getSteamingTargetTimer() {
    const targetTimer = parseInt(this.properties.timeSetZ, 10);
    if (Number.isInteger(targetTimer)) return targetTimer;
    return undefined;
  }

  getBakingTargetTemperature() {
    const targetTemperature = parseInt(this.properties.tempSetK, 10);
    if (Number.isInteger(targetTemperature)) return targetTemperature;
    return undefined;
  }

  getBakingTargetTimer() {
    const bakingTimer = parseInt(this.properties.timeSetZ, 10);
    if (Number.isInteger(bakingTimer)) return bakingTimer;
    return undefined;
  }

  setPower(v) {
    return this.miioCall(v ? 'setBootUp' : 'setTurnOff', []);
  }

  setPrepare(v) {

  }

  setStopPrepare() {

  }

  setStart(mode, steamTargetTemperature, steamTargetTimer, bakingTargetTemperature, bakingTargetTimer) {
    return this.miioCall('setStartMode', [mode, steamTargetTemperature, steamTargetTimer, bakingTargetTemperature, bakingTargetTimer]);
  }

  setPause(v) {
    return this.miioCall('setPause', [v ? 1 : 0]);
  }

  setStop() {
    return this.miioCall('setEnd', []);
  }

};
