import { getWithoutPrompt } from './getWithoutPrompt';
import { renewTokensWithRefresh } from './renewTokensWithRefresh';
import { getDefaultTokenParams } from './util';
export function renewTokens(sdk, options) {
    // If we have a refresh token, renew using that, otherwise getWithoutPrompt
    // Calling via async as auth-js doesn't yet (as of 4.2) ensure that updateAuthState() was ever called
    return sdk.tokenManager.getTokens()
        .then(tokens => tokens.refreshToken)
        .then(refreshTokenObject => {
        if (refreshTokenObject) {
            return renewTokensWithRefresh(sdk, options, refreshTokenObject);
        }
        options = Object.assign({
            scopes: sdk.options.scopes,
            authorizeUrl: sdk.options.authorizeUrl,
            userinfoUrl: sdk.options.userinfoUrl,
            issuer: sdk.options.issuer
        }, options);
        if (sdk.options.pkce) {
            options.responseType = 'code';
        }
        else {
            const { responseType } = getDefaultTokenParams(sdk);
            options.responseType = responseType;
        }
        return getWithoutPrompt(sdk, options)
            .then(res => res.tokens);
    });
}
