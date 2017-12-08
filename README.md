## OTP Generator
A HMAC-based OTP (HOTP) and Time-based OTP (TOTP) that generates OTP tokens from OTP key with customizable hash algorithm.

*Installation*
To-do

### Sample Usage:
`
  var otpGenerator = require('otp-generator')

  const hotpToken = otpGenerator.hotp({ key: '12345678901234567890', counter: 100 });
  const totpToken = otpGenerator.totp({ key: '12345678901234567890' });
`


### License
To-do