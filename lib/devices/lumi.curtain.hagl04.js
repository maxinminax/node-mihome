const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.curtain.hagl04';
  static name = 'Aqara curtain controller B1';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1595842417673p5sgxavh.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=kK7kRtnV47OjAqs1pRa074RFg7o=';

  getLevel() {
    const level = parseInt(this.properties.curtain_level, 10);
    if (level >= 0) return level;
    return undefined;
  }

  getStatus() {
    return this.properties.curtain_status;
  }

  setLevel(v) { // 0 - 100
    return this.write({ curtain_level: String(v) });
  }

  setStatus(v) { // close, open, stop
    return this.write({ curtain_status: v });
  }

  setOpen() {
    return this.setStatus('open');
  }

  setClose() {
    return this.setStatus('close');
  }

  setStop() {
    return this.setStatus('stop');
  }

};
