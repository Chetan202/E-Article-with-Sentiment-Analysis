"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.postToTokenEndpoint = postToTokenEndpoint;
exports.postRefreshToken = postRefreshToken;

var _errors = require("../../errors");

var _util = require("../../util");

var _http = _interopRequireDefault(require("../../http"));

function validateOptions(options) {
  // Quick validation
  if (!options.clientId) {
    throw new _errors.AuthSdkError('A clientId must be specified in the OktaAuth constructor to get a token');
  }

  if (!options.redirectUri) {
    throw new _errors.AuthSdkError('The redirectUri passed to /authorize must also be passed to /token');
  }

  if (!options.authorizationCode && !options.interactionCode) {
    throw new _errors.AuthSdkError('An authorization code (returned from /authorize) must be passed to /token');
  }

  if (!options.codeVerifier) {
    throw new _errors.AuthSdkError('The "codeVerifier" (generated and saved by your app) must be passed to /token');
  }
}

function getPostData(sdk, options) {
  // Convert Token params to OAuth params, sent to the /token endpoint
  var params = (0, _util.removeNils)({
    'client_id': options.clientId,
    'redirect_uri': options.redirectUri,
    'grant_type': options.interactionCode ? 'interaction_code' : 'authorization_code',
    'code_verifier': options.codeVerifier
  });

  if (options.interactionCode) {
    params['interaction_code'] = options.interactionCode;
  } else if (options.authorizationCode) {
    params.code = options.authorizationCode;
  }

  const {
    clientSecret
  } = sdk.options;

  if (clientSecret) {
    params['client_secret'] = clientSecret;
  } // Encode as URL string


  return (0, _util.toQueryString)(params).slice(1);
} // exchange authorization code for an access token


function postToTokenEndpoint(sdk, options, urls) {
  validateOptions(options);
  var data = getPostData(sdk, options);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return _http.default.httpRequest(sdk, {
    url: urls.tokenUrl,
    method: 'POST',
    args: data,
    headers
  });
}

function postRefreshToken(sdk, options, refreshToken) {
  return _http.default.httpRequest(sdk, {
    url: refreshToken.tokenUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    args: Object.entries({
      client_id: options.clientId,
      // eslint-disable-line camelcase
      grant_type: 'refresh_token',
      // eslint-disable-line camelcase
      scope: refreshToken.scopes.join(' '),
      refresh_token: refreshToken.refreshToken // eslint-disable-line camelcase

    }).map(function ([name, value]) {
      return name + '=' + encodeURIComponent(value);
    }).join('&')
  });
}
//# sourceMappingURL=token.js.map