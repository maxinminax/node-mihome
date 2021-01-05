const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_86plug.aq1';
  static name = 'Aqara Wall Outlet';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551947140bbugrsl6.png';

  getPower() {
    const power = this.properties.channel_0;
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

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

};
