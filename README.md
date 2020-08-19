# MiHome Device Library

Control MiHome devices via local network or cloud.

## Supported devices

See [DEVICES.md](DEVICES.md)

It have many models of device, each devices have many properties and method, you can find all in [/devices](/devices) folder.

## Installation

```
npm install miio
```

## Usage

```javascript
const mihome = require('mihome');
```

Login Mijia account to use cloud protocol. It's optional but some devices aren't supported local protocol so you need login to control that devices.

Init protocols

```javascript
mihome.miioProtocol.init();
mihome.aqaraProtocol.init();
const username = 'email@example.com';
const password = 'password';
await mihome.miCloudProtocol.login(username, password);
```

Cloud methods

```javascript
await mihome.miCloudProtocol.getDevices(); // return all devices from your acount with all information (deviceId, token, model ...) to create device in the next step
await mihome.miCloudProtocol.getDevices([deviceId1, deviceId2, ...]); // get devices information from list ids
```

Create device:

```javascript
const device = mihome.device({
  id: '100000', // required, device id
  model: 'zhimi.aircondition.v1', // required, device model

  address: '192.168.31.13', // miio-device option, local ip address
  token: 'abcdefgfabcdefgfabcdefgfabcdefgf', // miio-device option, device token
  refresh: 30000 // miio-device option, interval refresh device properties in ms
  
  parent: '1234abcd', // aqara-device option, gateway SID for aqara-protocol device
});
device.on('properties', (data) => {
  console.log(properties);
});
await device.setPower(true); // call the method
await device.init(); // start connect and interval load properties
device.destroy();
```

List properties and methods of device can be found at ./devices folder

## Compare with other libraries

The populate nodejs package for xiaomi devices current is miio: https://github.com/aholstenson/miio

| | node-mihome | miio |
| :--- |:----: | :-----:|
| implement miio protocol | **yes** | **yes** |
| implement miot protocol (for many device exp. mi purifier 3) | **yes** | no |
| implement aqara protocol (for zigbee devices) | **full** | no (except read actions) |
| implement micloud protocol (easy to view the device token and many useful information, control devices from internet, control devices which not allow from LAN, ...) | **yes** | no |
| number of deviec | **large** | medium |
| update | **usually** | a long time since last update |


## Todos list

- [x] Implement miio-protocol: https://github.com/OpenMiHome/mihome-binary-protocol/blob/master/doc/PROTOCOL.md
- [x] Implement aqara-protocol: http://docs.opencloud.aqara.com/en/development/gateway-LAN-communication/
- [x] Implement micloud-protocol: cloud login, access device information (model, token, ...), update device, ...
- [ ] Implement ble-protocol: for bluetooth devices
- [ ] Documents
- [ ] Add more devics

## Reporting issues or need more devices

I only have a litte devices in Mi Ecosystem, so wellcome for all issues or new device request.

## Buy me a coffee

BTC: 1E9k2s3swbTwPRgHqjNHmxkWF8hf7uN2sc

ETH: 0x25b744eeb2a979f39e8375c8c9fac6db750438b1

Paypal: https://paypal.me/maxinminax
