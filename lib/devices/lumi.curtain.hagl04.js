const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.curtain.hagl04';
  static name = 'Aqara curtain controller B1';
  static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-product-center/developer_1595842417673p5sgxavh.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=kK7kRtnV47OjAqs1pRa074RFg7o=';

  setLevel(v) { // 0 - 100
    return this.write({ curtain_level: String(v) });
  }

  setStatus(v) { // close, open, stop
    return this.write({ curtain_status: v });
  }

  open() {
    return this.setStatus('open');
  }

  close() {
    return this.setStatus('close');
  }

  stop() {
    return this.setStatus('stop');
  }

};
