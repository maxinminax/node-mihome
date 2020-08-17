const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_ln2.aq1';
  static name = 'Aqara Wall Switch (With Neutral, Double Rocker)';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_15958305737839HWLXHYa.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=3GAU7I7iRgLfSd9WGUY2xMDSWr4=';

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

};
