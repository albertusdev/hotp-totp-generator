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
- To be added later. See code directly and install JSDocs for better understanding of the customizable feature.
