# MiHome Device Library

Control MiHome devices via local network or cloud.

## Devices models

It have many models of device, each devices have many properties and method, you can find all in ./devices folder.

## Installation

```
npm install miio
```

## Usage

```javascript
const mihome = require('mihome');
```

Login Mijia account to use cloud protocol. It's optional but some devices aren't supported local protocol so you need login to control that devices.

```javascript
await mihome.miCloudProtocol.login({
  username: 'email@example.com',
  password: 'password'
});
await mihome.miCloudProtocol.getDevices(); // return all devices from your acount with all information to create device in the next step
```

Create device:

```javascript
const device = mihome.device({
  id: '100000', // device id
  address: '192.168.31.13', // local ip address
  model: 'zhimi.aircondition.v1', // device model
  token: 'abcdefgfabcdefgfabcdefgfabcdefgf', // device token
  protocol: 'local|cloud', // optional
  parent: '1234abcd' // gateway SID for aqara-protocol device
  refresh: 30000 // interval refresh device properties in ms
})
```

List properties and methods of device can be found at ./devices folder

## Todos list

- [x] Implement miio-protocol: https://github.com/OpenMiHome/mihome-binary-protocol/blob/master/doc/PROTOCOL.md
- [x] Implement aqara-protocol: http://docs.opencloud.aqara.com/en/development/gateway-LAN-communication/
- [x] Implement micloud-protocol
- [ ] Implement ble-protocol: for bluetooth devices
- [ ] Documents
- [ ] Add more devics

## Reporting issues or need more devices

I only have a litte devices in Mi Ecosystem, so wellcome for all issues or new device request.

## Buy me a coffee

BTC: 1E9k2s3swbTwPRgHqjNHmxkWF8hf7uN2sc

ETH: 0x25b744eeb2a979f39e8375c8c9fac6db750438b1

Paypal: https://paypal.me/maxinminax
