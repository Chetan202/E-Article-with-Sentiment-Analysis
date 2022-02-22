"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.verifyToken = verifyToken;

var _wellKnown = require("./endpoints/well-known");

var _util = require("./util");

var _errors = require("../errors");

var _decodeToken = require("./decodeToken");

var sdkCrypto = _interopRequireWildcard(require("../crypto"));

/* eslint-disable max-len */

/* eslint-disable complexity */

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
// Verify the id token
async function verifyToken(sdk, token, validationParams) {
  if (!token || !token.idToken) {
    throw new _errors.AuthSdkError('Only idTokens may be verified');
  } // Decode the Jwt object (may throw)


  var jwt = (0, _decodeToken.decodeToken)(token.idToken);
  var openIdConfig = await (0, _wellKnown.getWellKnown)(sdk); // using sdk.options.issuer

  var validationOptions = {
    issuer: openIdConfig.issuer,
    // sdk.options.issuer may point to a proxy. Use "real" issuer for validation.
    clientId: sdk.options.clientId,
    ignoreSignature: sdk.options.ignoreSignature
  };
  Object.assign(validationOptions, validationParams); // Standard claim validation (may throw)

  (0, _util.validateClaims)(sdk, jwt.payload, validationOptions); // If the browser doesn't support native crypto or we choose not
  // to verify the signature, bail early

  if (validationOptions.ignoreSignature == true || !sdk.features.isTokenVerifySupported()) {
    return token;
  }

  const key = await (0, _wellKnown.getKey)(sdk, token.issuer, jwt.header.kid);
  const valid = await sdkCrypto.verifyToken(token.idToken, key);

  if (!valid) {
    throw new _errors.AuthSdkError('The token signature is not valid');
  }

  if (validationParams && validationParams.accessToken && token.claims.at_hash) {
    const hash = await sdkCrypto.getOidcHash(validationParams.accessToken);

    if (hash !== token.claims.at_hash) {
      throw new _errors.AuthSdkError('Token hash verification failed');
    }
  }

  return token;
}
//# sourceMappingURL=verifyToken.js.map