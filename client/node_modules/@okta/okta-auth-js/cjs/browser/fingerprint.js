"use strict";

exports.default = fingerprint;

var _errors = require("../errors");

var _features = require("../features");

var _oidc = require("../oidc");

function fingerprint(sdk, options) {
  options = options || {};

  if (!(0, _features.isFingerprintSupported)()) {
    return Promise.reject(new _errors.AuthSdkError('Fingerprinting is not supported on this device'));
  }

  var timeout;
  var iframe;
  var listener;
  var promise = new Promise(function (resolve, reject) {
    iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // eslint-disable-next-line complexity

    listener = function listener(e) {
      if (!e || !e.data || e.origin !== sdk.getIssuerOrigin()) {
        return;
      }

      try {
        var msg = JSON.parse(e.data);
      } catch (err) {
        // iframe messages should all be parsable
        // skip not parsable messages come from other sources in same origin (browser extensions)
        // TODO: add namespace flag in okta-core to distinguish messages that come from other sources
        return;
      }

      if (!msg) {
        return;
      }

      if (msg.type === 'FingerprintAvailable') {
        return resolve(msg.fingerprint);
      }

      if (msg.type === 'FingerprintServiceReady') {
        e.source.postMessage(JSON.stringify({
          type: 'GetFingerprint'
        }), e.origin);
      }
    };

    (0, _oidc.addListener)(window, 'message', listener);
    iframe.src = sdk.getIssuerOrigin() + '/auth/services/devicefingerprint';
    document.body.appendChild(iframe);
    timeout = setTimeout(function () {
      reject(new _errors.AuthSdkError('Fingerprinting timed out'));
    }, options.timeout || 15000);
  });
  return promise.finally(function () {
    clearTimeout(timeout);
    (0, _oidc.removeListener)(window, 'message', listener);

    if (document.body.contains(iframe)) {
      iframe.parentElement.removeChild(iframe);
    }
  });
}

module.exports = exports.default;
//# sourceMappingURL=fingerprint.js.map