const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_neutral2.v1';
  static name = 'Aqara Wall Switch (No Neutral, Double Rocker)';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_155194623082wls1kr.png';

  getPower(channel = 0) {
    const power = this.properties[`channel_${channel}`];
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getPowerCapacity() {
    const powerCapacity = parseInt(this.properties.load_power, 10);
    if (powerCapacity > 0) return powerCapacity;
    return undefined;
  }

  getPowerConsumed() {
    const powerConsumed = parseInt(this.properties.power_consumed, 10);
    if (powerConsumed > 0) return powerConsumed;
    return undefined;
  }

  setPower(v, channel = 0) {
    return this.write({ [`channel_${channel}`]: v ? 'on' : 'off' });
  }

};
