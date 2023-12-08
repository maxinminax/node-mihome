const Device = require('../device-miio');

module.exports = class extends Device {

    static model = 'zhimi.airpurifier.mb5';
    static name = 'Mi Air Purifier 4';
    static image = 'https://cdn.awsde0.fds.api.mi-img.com/miio.files/developer_15504816557tej1pj6.png';

    constructor(opts) {
        super(opts);

        this._miotSpecType = 'urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-mb5:1';
        this._propertiesToMonitor = [
            'air-purifier:fault',
            'air-purifier:on',
            'air-purifier:fan-level',
            'air-purifier:mode',
            'air-purifier:anion',
            'environment:pm2.5-density',
            'environment:relative-humidity',
            'environment:temperature',
            'filter:filter-life-level',
            'filter:filter-used-time',
            'filter:filter-left-time',
            'alarm:alarm',
            'custom-service:favorite-level',
            'screen:brightness',
            'physical-controls-locked:physical-controls-locked',
            'aqi:aqi-updata-heartbeat'];
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

    getFault() {
        const fault = this.properties['air-purifier:fault'];
        if (fault === 0) return 'No Faults"';
        if (fault === 1) return 'Sensor PM Error';
        if (fault === 2) return 'Temp Error';
        if (fault === 3) return 'Hum Error';
        if (fault === 4) return 'No Filter';
        return undefined;
    }

    getFanLevel() { // 1 - 3
        const fanLevel = this.properties['air-purifier:fan-level'];
        if (fanLevel === 1) return 'Level1';
        if (fanLevel === 2) return 'Level2';
        if (fanLevel === 3) return 'Level3';
        return undefined;
    }

    getFavLevel() { // 0 - 11
        return this.properties['custom-service:favorite-level'];
    }

    getAnion() {
        return this.properties['air-purifier:anion'];
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

    getFilterRemaining() {
        return this.properties['filter:filter-left-time'];
    }

    getBuzzer() {
        return this.properties['alarm:alarm'];
    }

    getLcdBrightness() {
        return this.properties['screen:brightness'];
    }

    getAqiRealtimeUpdateDuration() {
        return this.properties['aqi:aqi-updata-heartbeat'];
    }

    setPower(v) {
        return this.miotSetProperty('air-purifier:on', v);
    }

    setMode(v) {
        if (v === 'auto') v = 0;
        else if (v === 'sleep') v = 1;
        else if (v === 'favorite') v = 2;
        else if (v === 'none') v = 3;
        return this.miotSetProperty('air-purifier:mode', v);
    }

    setFavSpeed(v) { // 200-2300
        return this.miotSetProperty('custom-service:favorite-speed', v);
    }

    setFanLevel(v) { // 1-3
        if (v === 'Level1') v = 1;
        else if (v === 'Level2') v = 2;
        else if (v === 'Level3') v = 3;
        return this.miotSetProperty('air-purifier:fan-level', v);
    }

    setFavLevel(v) { // 0 - 11
        return this.miotSetProperty('custom-service:favorite-level', v);
    }

    setAnion(v) {
        return this.miotSetProperty('air-purifier:anion', v);
    }

    setBuzzer(v) {
        return this.miotSetProperty('alarm:alarm', v);
    }

    setLcdBrightness(v) { // 0-Close, 1-Bright, 2-Brightest
        return this.miotSetProperty('screen:brightness', v);
    }

    setChildLock(v) {
        return this.miotSetProperty('physical-controls-locked:physical-controls-locked', v);
    }

    // Sets duration for which the PM2.5-sensor provides real-time data. Duration is automatically decreased until "0" is reached
    setAqiRealtimeUpdateDuration(v) {
        return this.miotSetProperty('aqi:aqi-updata-heartbeat', v);
    }

};
