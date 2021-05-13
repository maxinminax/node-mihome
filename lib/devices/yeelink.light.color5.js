const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

    static model = 'yeelink.light.color5';
    static name = 'MI LED Smart Bulb (White and Color)';
    static image = 'https://i01.appmifile.com/webfile/globalimg/products/pc/mi-led-smart-bulb-essential/specs.png';

    constructor(opts) {
        super(opts);

        this._propertiesToMonitor = ['power', 'bright', 'ct', 'rgb', 'hue', 'sat', 'color_mode', 'flowing', 'delayoff', 'flow_params', 'music_on'];

        this.on('properties', (props) => {
            this._properties = props;
        });

        this.init();
    }

    getPower() {
        const { power } = this.properties;
        if (power === 'on') return true;
        if (power === 'off') return false;
        return undefined;
    }

    getBrightness() {
        const brightness = parseInt(this.properties.bright, 10);
        const nightLightBrightness = parseInt(this.properties.nl_br, 10);
        if (nightLightBrightness > 0) return nightLightBrightness;
        if (brightness > 0) return brightness;
        return undefined;
    }

    getColorTemperature() {
        const colorTemperature = parseInt(this.properties.ct, 10);
        if (colorTemperature > 0) return colorTemperature;
        return undefined;
    }

    getSleepMode() {
        const nightLightBrightness = parseInt(this.properties.nl_br, 10);
        if (nightLightBrightness > 0) return true;
        if (nightLightBrightness === 0) return false;
        return undefined;
    }

    getColor() {
        const rgb = parseInt(this.properties.rgb, 10);
        if (rgb > 0) return rgb;
        return undefined;
    }

    setPower(v) {
        return this.miioCall('set_power', withLightEffect(v ? 'on' : 'off'));
    }

    setBrightness(v) {
        return this.miioCall('set_bright', withLightEffect(v));
    }

    setColorTemperature(v) {
        return this.miioCall('set_ct_abx', withLightEffect(v));
    }

    setSleepMode(v) {
        return this.miioCall('set_ps', ['nightlight', v ? 'on' : 'off']);
    }

    setColor(v) {
        return this.miioCall('set_rgb', withLightEffect(v));
    }

    toggle() {
        return this.miioCall('toggle');
    }

};
