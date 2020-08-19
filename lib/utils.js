const COLOR_TEMPERATURE_MIN = 2700;
const COLOR_TEMPERATURE_MAX = 6500;

const VOLTAGE_MIN = 2800;
const VOLTAGE_MAX = 3300;

const DEFAULT_EFFECT = 'smooth';
const DEFAULT_DURATION = 500;

module.exports.stripLumiFromId = id => {
  if (id.indexOf('lumi.') === 0) {
    return id.substring(5);
  }
  return id;
};

module.exports.withLightEffect = (arg, duration) => {
  const result = Array.isArray(arg) ? arg : [arg];

  if (duration) {
    if (duration.ms > 0) {
      result.push(DEFAULT_EFFECT);
      result.push(duration.ms);
    } else {
      result.push('sudden');
      result.push(0);
    }
  } else {
    result.push(DEFAULT_EFFECT);
    result.push(DEFAULT_DURATION);
  }

  return result;
};

module.exports.getColorTemperaturePercent = (
  kelvin,
  colorTemperatureMin = COLOR_TEMPERATURE_MIN,
  colorTemperatureMax = COLOR_TEMPERATURE_MAX,
) => {
  kelvin = parseInt(kelvin, 10);
  if (kelvin > 0) {
    return 1 - (kelvin - colorTemperatureMin) / (colorTemperatureMax - colorTemperatureMin);
  }
  return undefined;
};

module.exports.getColorTemperatureKelvin = (
  percent,
  colorTemperatureMin = COLOR_TEMPERATURE_MIN,
  colorTemperatureMax = COLOR_TEMPERATURE_MAX,
) => {
  percent = parseInt(percent, 10);
  if (percent > 0) {
    return Math.floor(colorTemperatureMin
    + (1 - percent) * (colorTemperatureMax - colorTemperatureMin));
  }
  return undefined;
};

module.exports.getBatteryFromVoltage = (
  voltage,
  voltageMin = VOLTAGE_MIN,
  voltageMax = VOLTAGE_MAX,
) => {
  voltage = parseInt(voltage, 10);
  if (voltage > 0) return ((voltage - voltageMin) / (voltageMax - voltageMin)) * 100;
  return undefined;
};
