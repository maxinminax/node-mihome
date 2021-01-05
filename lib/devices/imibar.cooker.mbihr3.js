const Device = require('../device-miio');

const CODES = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C',
  'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
  'X', 'Y', 'Z', '[', '*', ']', '^', '_', '+', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'];

const codeToNum = str => {
  str = str.toString();
  const num = CODES.indexOf(str);
  return num > -1 ? num : 48;
};

const numtoCode = num => {
  num = parseInt(num, 10);
  return CODES[num] || '';
};

module.exports = class extends Device {

  static model = 'imibar.cooker.mbihr3';
  static name = 'Cooking robot';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1548319397xzm4c2vv.png';

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

  getMode() {
    const mode = parseInt(this.properties[0], 10);
    if (mode === 0) return 'cooking';
    if (mode === 1) return 'rice';
    return undefined;
  }

  getState() {
    const status = codeToNum(this.properties[1]);
    if (status === 0) return 'Standby';
    if (status === 1) return 'Waiting';
    if (status === 2) return 'Add rice';
    if (status === 3) return 'Wash rice';
    if (status === 4) return 'Cooking';
    if (status === 5) return 'Water adding';
    if (status === 6) return 'Small fire';
    if (status === 7) return 'Boiling';
    if (status === 8) return 'Braising';
    if (status === 9) return 'Keeping warm';
    if (status === 10) return 'Cleaning';
    if (status === 11) return 'Disinfecting';
    if (status === 12) return 'Box emptied';
    return undefined;
  }

  getAllow() {
    const allow = parseInt(this.properties[2], 10);
    if (allow === 1) return true;
    if (allow === 0) return false;
    return undefined;
  }

  getRemainingPTime() {
    const pHours = this.properties[3];
    const pMinutes = this.properties[4];
    if (pHours && pMinutes) {
      return codeToNum(pHours) * 3600 + codeToNum(pMinutes) * 60;
    }
    return undefined;
  }

  getRemainingRice() {
    const remainingRice = this.properties[5];
    if (remainingRice) return codeToNum(remainingRice) * 5;
    return undefined;
  }

  getRemainingRiceTime() {
    const rHours = this.properties[9];
    const rMinutes = this.properties[10];
    if (rHours && rMinutes) {
      return codeToNum(rHours) * 3600 + codeToNum(rMinutes) * 60;
    }
    return undefined;
  }

  getRemainingWarmTime() {
    const wHours = this.properties[11];
    const wMinutes = this.properties[12];
    if (wHours && wMinutes) {
      return codeToNum(wHours) * 3600 + codeToNum(wMinutes) * 60;
    }
    return undefined;
  }

  getPalate() {
    const palate = this.properties[13];
    if (palate === 1) return 'Porridge';
    if (palate === 2) return 'Thick porridge';
    if (palate === 3) return 'Baby porrridge';
    if (palate === 4) return 'GD porrridge';
    if (palate === 6) return 'Sweet cooking';
    if (palate === 8) return 'Claypot rice';
    // if (palate === 9) return 'Quick boiling';
    if (palate) return 'Quick boiling';
    return undefined;
  }

  getSeed() {
    const seed = this.properties[14];
    if (seed === 1) return 'Northeast rice';
    if (seed === 2) return 'Long grain rice';
    if (seed === 3) return 'Thai rice';
    if (seed === 4) return 'Daohuaxiang rice';
    if (seed === 5) return 'Wuchang rice';
    if (seed === 6) return 'Coarse Cereals';
    return undefined;
  }

  getSize() { // 1 - 8
    const size = this.properties[15];
    if (size > 0) return size;
    return undefined;
  }

  getGrain() {
    const grain = this.properties[16];
    if (grain === 1) return 'Millet';
    if (grain === 2) return 'Red bean';
    if (grain === 3) return 'Black bean';
    if (grain === 4) return 'Mung bean';
    if (grain === 5) return 'Black rice';
    if (grain === 6) return 'Red rice';
    if (grain === 7) return 'Corn';
    if (grain === 8) return 'Coix seed';
    return undefined;
  }

  getCup() {
    const cup = parseInt(this.properties[17], 10);
    if (cup >= 0) return cup * 30;
    return undefined;
  }

  getCook() {
    let cook = this.properties[18];
    if (!cook) return undefined;
    cook = codeToNum(cook);
    if (cook === 1) return 'Soup(water)';
    if (cook === 2) return 'Steamed bun';
    if (cook === 3) return 'Steamed dumplings';
    if (cook === 4) return 'Steamed fish';
    if (cook === 5) return 'Steamed pork ribs';
    if (cook === 6) return 'Steamed sweet potato';
    if (cook === 7) return 'Steamed corn';
    if (cook === 8) return 'Rice dumpling(water)';
    if (cook === 9) return 'Dumpling(water)';
    if (cook === 10) return 'Noodles(water)';
    if (cook === 11) return 'Rice noodles(water)';
    if (cook === 12) return 'Make cakes';
    if (cook === 13) return 'Reheat';
    if (cook === 14) return 'Warm';
    return undefined;
  }

  getError() {
    const error = this.properties[20];
    if (error) return codeToNum(error);
    return undefined;
  }

  setRice(palate, seed, size, grain, cup, allow, hours, minutes, wash) {
    return this.miioCall('Set_StartR', []);
  }

  setCook() {
    return this.miioCall('Set_StartR', []);
  }

  stop() {
    return this.miioCall('Set_Off', [1]);
  }

};
