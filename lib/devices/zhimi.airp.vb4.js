const Device = require('../device-miio');
//edited and checked for full funcionality by Wildbill-Z
module.exports = class extends Device {

    static model = 'zhimi.airp.vb4';
    static name = 'Xiaomi Smart Air Purifier 4 Pro';
    static image = 'https://cnbj1.fds.api.xiaomi.com/iotweb-product-center/c5749d791740f4239ac4bb73d5dcc3a2_2031503-168.png';

    constructor(opts) {
    super(opts);

    this._miotSpecType = 'urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-vb4:1';
    this._propertiesToMonitor = [
        'air-purifier:fault',
        'air-purifier:on',
        'air-purifier:fan-level',
        'air-purifier:mode',
        'environment:pm2.5-density',
        'environment:pm10-density',
        'environment:relative-humidity',
        'environment:temperature',
        'filter:filter-life-level',
        'filter:filter-used-time',
        'filter:filter-left-time',
        'alarm:alarm',
        'physical-controls-locked:physical-controls-locked',
        'custom-service:motor-set-speed',
        'custom-service:moto-speed-rpm',
        'custom-service:favorite-level',
        'custom-service:favorite-speed',
        'custom-service:manual-level',
        'screen:brightness',
        ];
    }

    getFilterlife() {
        return this.properties['filter:filter-life-level'];
    }

    getFilterused() {
        return this.properties['filter:filter-used-time'];
    }

    getPower() {
        return this.properties['air-purifier:on']; 
    }

    getMode() {
        const mode = this.properties['air-purifier:mode']; 
        if (mode === 0) return 'auto';
        if (mode === 1) return 'sleep';
        if (mode === 2) return 'favorite';
        if (mode === 3) return 'manual';
        return undefined;
    }

    getFanLevel() { // 1 - 3
        return this.properties['air-purifier:fan-level']; 
    }

    getFavLevel() { // 1 - 11
        return this.properties['custom-service:favorite-level']; 
    }

    getSpeed() {
        return this.properties['custom-service:moto-speed-rpm']; 
    }

    getSetSpeed() {
        return this.properties['custom-service:motor-set-speed']; 
    }


    getTemperature() {
        return this.properties['environment:temperature']; 
    }

    getHumidity() {
        return this.properties['environment:relative-humidity']; 
    }

    // eslint-disable-next-line camelcase
    getPM2_5() {
        return this.properties['environment:pm2.5-density']; 
    }
    //Add PM10 sensor
    getPM10() {
        return this.properties['environment:pm10-density']; 
    }

    getFilterRemaining() {
        const filterTotal = this.properties['filter:filter-life-level'];
        const filterUsed = this.properties['filter:filter-used-time'];
        if (filterTotal > 0 && filterUsed >= 0) {
        //return Math.max((1 - filterUsed / filterTotal) * 100, 0);
        return Math.max(filterUsed / (100 - filterTotal) * filterTotal/24, 0);
        }
        return undefined;
    }

    getBuzzer() {
        return this.properties['alarm:alarm'];
    }

    getLcdBrightness() {
        return this.properties['screen:brightness']; 
    }

    setPower(v) {
        return this.miotSetProperty('air-purifier:on', v); 
    }

    setMode(v) {
        if (v === 'auto') v = 0;
        else if (v === 'sleep') v = 1;
        else if (v === 'favorite') v = 2;
        else if (v === 'manual') v = 3;
        return this.miotSetProperty('air-purifier:mode', v); 
    }

    setFanLevel(v) { // 1-3
        return this.miotSetProperty('air-purifier:fan-level', v); 
    }

    setFavLevel(v) { // 1 - 11
        return this.miotSetProperty('custom-service:favorite-level', v); 
    }

    setBuzzer(v) {
        return this.miotSetProperty('alarm:alarm', v); 
    }

    setLcdBrightness(v) { // 0-brightest, 1-glimmer, 2-led_closed
        return this.miotSetProperty('screen:brightness', v); 
    }

    setChildLock(v) {
        return this.miotSetProperty('physical-controls-locked:physical-controls-locked', v);
    }

};
