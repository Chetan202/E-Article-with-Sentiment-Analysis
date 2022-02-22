var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { AuthSdkError } from '../errors';
import { getOAuthUrls } from './util/oauth';
import { handleOAuthResponse } from './handleOAuthResponse';
import { postRefreshToken } from './endpoints/token';
export function renewTokensWithRefresh(sdk, tokenParams, refreshTokenObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientId } = sdk.options;
        if (!clientId) {
            throw new AuthSdkError('A clientId must be specified in the OktaAuth constructor to renew tokens');
        }
        const renewTokenParams = Object.assign({}, tokenParams, {
            clientId,
        });
        const tokenResponse = yield postRefreshToken(sdk, renewTokenParams, refreshTokenObject);
        const urls = getOAuthUrls(sdk, tokenParams);
        const { tokens } = yield handleOAuthResponse(sdk, renewTokenParams, tokenResponse, urls);
        return tokens;
    });
}
