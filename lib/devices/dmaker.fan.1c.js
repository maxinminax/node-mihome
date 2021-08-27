const Device = require('../device-miio');
 
module.exports = class extends Device {
 
  static model = 'dmaker.fan.1c';
  static name = 'Mi Smart Standing Fan 1C';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1541408255kg3xtr1j.png';
 
  constructor(opts) {
    super(opts);
 
    this._miotSpecType = 'urn:miot-spec-v2:device:fan:0000A005:dmaker-1c:1';
    this._propertiesToMonitor = [
      'fan:on',
      'fan:mode',
      'fan:fan-level',
      'fan:horizontal-swing',
      'fan:brightness',
      'fan:alarm',
      'physical-controls-locked:physical-controls-locked',
      'fan:off-delay-time'
      ];
  }
 
  getPower() {
    return this.properties['fan:on'];
  }
   
  setPower(v) {
    return this.miotSetProperty('fan:on', v);
  }

  setMode(v) {
    return this.miotSetProperty('fan:mode', v);
  }
 
  setFanLevel(v) {
    return this.miotSetProperty('fan:fan-level', v);
  }

  setHorizontalSwing(v) {
    return this.miotSetProperty('fan:horizontal-swing', v);
  }

  setBrightness(v) {
    return this.miotSetProperty('fan:brightness', v);
  }
  
  setAlarm(v) {
    return this.miotSetProperty('fan:alarm', v);
  }


  setChildLock(v) {
    return this.miotSetProperty('physical-controls-locked:physical-controls-locked', v);
  }

  setOffDelayTime(v) {
    return this.miotSetProperty('fan:off-delay-time', v);
  }

};
