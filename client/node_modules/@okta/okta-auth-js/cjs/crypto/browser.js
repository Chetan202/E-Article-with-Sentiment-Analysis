"use strict";

exports.webcrypto = exports.btoa = exports.atob = void 0;

/* global atob, btoa, crypto */
const a = function (str) {
  return atob(str);
};

exports.atob = a;

const b = function (str) {
  return btoa(str);
};

exports.btoa = b;
const c = typeof crypto === 'undefined' ? null : crypto;
exports.webcrypto = c;
//# sourceMappingURL=browser.js.map