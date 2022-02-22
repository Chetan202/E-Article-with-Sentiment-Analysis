"use strict";

exports.webcrypto = exports.btoa = exports.atob = void 0;

/* global atob, btoa */
// Ponyfill for NodeJS
// Webpack config excludes this file
let a;
exports.atob = a;

if (typeof atob !== 'undefined') {
  exports.atob = a = atob;
} else {
  exports.atob = a = require('atob');
}

let b;
exports.btoa = b;

if (typeof btoa !== 'undefined') {
  exports.btoa = b = btoa;
} else {
  exports.btoa = b = require('btoa');
}

let crypto;

try {
  crypto = require('crypto');
} catch (err) {// this environment has no crypto module!
}

let webcrypto;
exports.webcrypto = webcrypto;

if (typeof crypto !== 'undefined' && crypto['webcrypto']) {
  exports.webcrypto = webcrypto = crypto['webcrypto'];
} else {
  const {
    Crypto
  } = require('@peculiar/webcrypto');

  exports.webcrypto = webcrypto = new Crypto();
}
//# sourceMappingURL=node.js.map