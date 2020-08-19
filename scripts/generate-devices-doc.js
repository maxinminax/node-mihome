const fs = require('fs');
const models = require('../lib/models');

const header = '# Supported devices - alphabet sort\n\n<table><thead><tr><th>#</th><th>model</th><th>name</th><th>image</th></tr></thead><tbody>';
const footer = '</tbody></table>';
let body = '';

Object.keys(models).forEach((model, k) => {
  const Device = models[model];
  body += `<tr><td>${k + 1}</td><td>${model}</td><td>${Device.name}</td><td><img src="${Device.image}" height="100"></td></tr>`;
});

const content = header + body + footer;

fs.writeFile('./DEVICES.md', content, err => {
  if (err) {
    console.log(err);
  }
});
