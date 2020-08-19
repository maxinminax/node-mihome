const fs = require('fs');
const models = require('../lib/models');

const header = `# Supported devices - alphabet sort

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>model</th>
      <th>name</th>
      <th width="100">image</th>
      <th>getters</th>
      <th>setters</th>
    </tr>
  </thead>
  <tbody>`;
const footer = `
  </tbody>
</table>`;
let body = '';

Object.keys(models).forEach((model, k) => {
  const Device = models[model];
  const methods = Object.getOwnPropertyNames(Device.prototype);
  const getters = methods.filter(method => method.indexOf('get') === 0);
  const setters = methods.filter(method => method.indexOf('set') === 0);
  body += `
    <tr>
      <td>${k + 1}</td>
      <td>${model}</td>
      <td>${Device.name}</td>
      <td><img src="${Device.image}" width="100"></td>
      <td><ul>${getters.map(getter => `<li>${getter}</li>`).join('')}</ul></td>
      <td><ul>${setters.map(setter => `<li>${setter}</li>`).join('')}</ul></td>
    </tr>`;
});

const content = header + body + footer;

fs.writeFile('./DEVICES.md', content, err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});
