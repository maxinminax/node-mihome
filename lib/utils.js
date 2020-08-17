const COLOR_TEMPERATURE_MIN = 2700;
const COLOR_TEMPERATURE_MAX = 6500;

const VOLTAGE_MIN = 2800;
const VOLTAGE_MAX = 3300;

const DEFAULT_EFFECT = 'smooth';
const DEFAULT_DURATION = 500;

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
  colorTemperature,
  colorTemperatureMin = COLOR_TEMPERATURE_MIN,
  colorTemperatureMax = COLOR_TEMPERATURE_MAX,
) => {
  colorTemperature = parseInt(colorTemperature, 10);
  return 1 - (parseInt(colorTemperature, 10) - colorTemperatureMin)
    / (colorTemperatureMax - colorTemperatureMin);
};

module.exports.getColorTemperatureKelvin = (
  colorTemperature,
  colorTemperatureMin = COLOR_TEMPERATURE_MIN,
  colorTemperatureMax = COLOR_TEMPERATURE_MAX,
) => {
  colorTemperature = parseInt(colorTemperature, 10);
  return Math.floor(colorTemperatureMin
    + (1 - colorTemperature) * (colorTemperatureMax - colorTemperatureMin));
};

module.exports.getBatteryFromVoltage = (
  voltage,
  voltageMin = VOLTAGE_MIN,
  voltageMax = VOLTAGE_MAX,
) => {
  voltage = parseInt(voltage, 10);
  return ((voltage - voltageMin) / (voltageMax - voltageMin)) * 100;
};
