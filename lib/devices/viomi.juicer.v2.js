const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'viomi.juicer.v2';
  static name = 'Viomi High Speed Blender（Quiet Version';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1534761442ykiht9se.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'run_status',
      'work_status',
      'mode',
      'cook_status',
      'warm_time',
      'cook_time',
      'left_time',
      'cooked_time',
      'curr_tempe',
      'mode_sort',
      'rev',
      'version',
      'stand_top_num',
      'warm_data',
      'hard_version'
    ];
  }

};
