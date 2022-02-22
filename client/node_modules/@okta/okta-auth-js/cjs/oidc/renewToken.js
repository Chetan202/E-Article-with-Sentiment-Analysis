"use strict";

exports.renewToken = renewToken;

var _errors = require("../errors");

var _types = require("../types");

var _getWithoutPrompt = require("./getWithoutPrompt");

/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */
function renewToken(sdk, token) {
  // Note: This is not used when a refresh token is present
  if (!(0, _types.isToken)(token)) {
    return Promise.reject(new _errors.AuthSdkError('Renew must be passed a token with ' + 'an array of scopes and an accessToken or idToken'));
  }

  var responseType;

  if (sdk.options.pkce) {
    responseType = 'code';
  } else if ((0, _types.isAccessToken)(token)) {
    responseType = 'token';
  } else {
    responseType = 'id_token';
  }

  const {
    scopes,
    authorizeUrl,
    userinfoUrl,
    issuer
  } = token;
  return (0, _getWithoutPrompt.getWithoutPrompt)(sdk, {
    responseType,
    scopes,
    authorizeUrl,
    userinfoUrl,
    issuer
  }).then(function (res) {
    // Multiple tokens may have come back. Return only the token which was requested.
    var tokens = res.tokens;
    return (0, _types.isIDToken)(token) ? tokens.idToken : tokens.accessToken;
  });
}
//# sourceMappingURL=renewToken.js.map