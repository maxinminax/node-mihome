const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'msj.f_washer.m1';
  static name = 'Sink cleaning machine';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15597180430y98dvyj.png';

  async loadProperties(props) {
    try {
      const data = await this.getProperties([]);
      this._properties = data;
      this.emit('available', true);
      this.emit('properties', data);
    } catch (e) {
      this.emit('unavailable', e.message);
    }
  }

};
