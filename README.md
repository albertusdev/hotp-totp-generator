# HOTP-TOTP-Generator
A highly customizable implementation of HMAC-based OTP (HOTP) and Time-based OTP (TOTP).
- [HOTP](https://tools.ietf.org/html/rfc4226)
- [TOTP](https://tools.ietf.org/html/rfc6238)

If something doens't work, please [file an issue](https://github.com/adalberht/hotp-totp-generator/issues)

## Installation
- npm install hotp-totp-generator --save

## Sample Usage:
```
  var hotpOtpGenerator = require('hotp-otp-generator')

  // Example of HOTP
  const hotpToken = hotpOtpGenerator.hotp({ key: '12345678901234567890', counter: 100 });

  // Example of TOTP
  const totpToken = hotpOtpGenerator.totp({ key: '12345678901234567890' });
```

## Docs
### HOTP Implementation
For HMAC-based One Time Password (HOTP), parameter is an **object** consisting of:

Key Name        | Type                                  | Default   | Value Description
---------       | ---------                             | -------   | -----------------
`key`           | `string`                              |   -       | Unique shared secret key for encrypting C values for HMAC algorithm
`counter`       | `number`                              |   -       | 8-bytes incrementing counter value
`algorithm`     | `enum: 'sha1' \| 'sha256' \| 'sha512'`  | `'sha1'`  | HMAC Algorithm used for encrypting the counter
`digits`        | `number`                              |   6       | Return digits of HOTP value

### Example:
### Customizing Default Algorithm
```js
const hotpTotpGenerator = require('hotp-totp-generator');
hotpTotpGenerator.hotp({
  key: "my-hotp-key",
  counter: 123,
  algorithm: 'sha256',
});
```
### Customizing Default Return Digits
```js
const hotpTotpGenerator = require('hotp-totp-generator');
hotpTotpGenerator.hotp({
  key: "my-hotp-key",
  counter: 123,
  digits: 10,
});
```

### TOTP Implementation
For Time-based One Time Password (TOTP), parameter is an **object** consisting of:

Key Name        | Type                                  | Default   | Value Description
---------       | ---------                             | -------   | -----------------
`key`           | `string`                              |   -       | Unique shared secret key for encrypting epoch time for HMAC algorithm
`T`             | `number`                              | current unix time       | [Epoch time (Unix time)](https://en.wikipedia.org/wiki/Unix_time)
`T0` | `number` | 0 | The Unix time to start counting time steps
`X`  | `number` | 30 | The time step in seconds
`algorithm`     | `enum: 'sha1' \| 'sha256' \| 'sha512'`  | `'sha1'`  | HMAC Algorithm used for encrypting the unix time
`digits`        | `number`                              |   6       | Return digits of HOTP value

### Example:
### Customizing Unix Time
```js
const hotpTotpGenerator = require('hotp-totp-generator');
hotpTotpGenerator.totp({
  key: "my-totp-key",
  T: 123456
});
```

### Customizing `T0` and `X`
```js
const hotpTotpGenerator = require('hotp-totp-generator');
hotpTotpGenerator.totp({
  key: "my-totp-key",
  T0: 10,
  X: 60,
});
```

## Contributing
Any contribution for this library would be very appreciated! Please open an issue / pull requests!
If you are interested on contributing, you can check out several things todo in the [TODO](#todo) section below:

## TODO
- Make CLI tool
- Add code coverage status
- Add npm status
- Add unit tests
