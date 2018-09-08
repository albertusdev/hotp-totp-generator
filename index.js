/*
  An algorithm to generate HOTP and TOTP token.
  HOTP: https://tools.ietf.org/html/rfc4226
  TOTP: https://tools.ietf.org/html/rfc6238
*/

var moment = require("moment");
var pad = require("pad-component");
var crypto = require("crypto");

const DEFAULT_CRYPTO_ALGORITHM = "sha1";
const DEFAULT_T0 = 0;
const DEFAULT_X = 30;
const DEFAULT_DIGITS = 6;

/**
 * Return a buffer (bytes) of given argument.
 * If given argument is number, return Buffer with size of 8 bytes padded with 0 from left
 * If given argument is string, return Buffer with full size of the strings
 *
 * @param {(string|number)} arg
 * @return {Buffer} buffer object
 */
function toBuffer(arg) {
  let buffer;
  if (arg.length) buffer = Buffer.from(arg);
  else {
    buffer = Buffer.alloc(8);
    buffer.writeUInt32BE(arg, 4);
  }
  return buffer;
}

/**
 * HashAlgorithm
 * @typedef {string} HashAlgorithm
 * @enum
 * @value {'sha512'} SHA-512
 * @value {'sha256'} SHA-256
 * @value {'sha1'} SHA-1
 */

/**
 * HOTP Algorithm implementation
 *
 * @param {string} key Unique shared secret key for encrypting C values for HMAC algorithm
 * @param {number} counter 8-bytes incrementing counter value
 * @param {HashAlgorithm} [algorithm=sha1] HMAC Algorithm, is one of 'sha1', 'sha256' and 'sha512'
 * @param {number} digits Return digits of HOTP value, according to RFC4226 spec, it should be at least 6 digitss.
 * @returns {number}
 *
 */
function hotp({
  key,
  counter,
  algorithm = DEFAULT_CRYPTO_ALGORITHM,
  digits = DEFAULT_DIGITS
}) {
  const keyBytes = toBuffer(key);
  const counterBytes = toBuffer(counter);
  const hash = crypto
    .createHmac(algorithm, keyBytes)
    .update(counterBytes)
    .digest("hex");
  return truncate(hash, digits);
}

/**
 * TOTP algorithm implementation
 *
 * @param {string} key Key for hash algorithm
 * @param {number} T T is epoch time (Unix time), if not given default to current Unix time
 * @param {number} T0 The Unix time to start counting time steps,
 * @param {number} X The time step in seconds
 * @param {HashAlgorithm} [algorithm=sha1] HMAC Algorithm, is one of 'sha1', 'sha256' and 'sha512'
 * @param {number} digits The number of digits to return
 */
function totp({
  key, // key for hash algorithm
  T, // T is epoch time (Unix time), if not given compute current Unix time
  T0 = DEFAULT_T0, // the Unix time to start counting time steps
  X = DEFAULT_X, // Number of steps according to TOTP
  algorithm = DEFAULT_CRYPTO_ALGORITHM,
  digits = DEFAULT_DIGITS
}) {
  const counter = Math.floor(((!T ? moment().unix() : T) - T0) / X);
  return hotp({ key, counter, algorithm, digits });
}

/**
 * Truncate implementation of HOTP algorithm
 *
 * @param {string} s Hex strings that will be truncated from offset byte to offset + 4 byte
 * @param {number} digits Number of digits to be returned
 * @returns {string} Numerical string in base 10 of the truncated hex strings
 */
function truncate(s, digits) {
  var offset = parseInt(s.charAt(s.length - 1), 16);

  var result = parseInt(s.substr(offset * 2, 2 * 4), 16);

  // Get only last 31 bits of result
  result = result & 0x7fffffff;

  return pad(String(result), digits, "0");
}

module.exports = {
  hotp,
  totp,
  truncate,
  toBuffer,
  DEFAULT_CRYPTO_ALGORITHM,
  DEFAULT_DIGITS,
  DEFAULT_T0,
  DEFAULT_X
};
