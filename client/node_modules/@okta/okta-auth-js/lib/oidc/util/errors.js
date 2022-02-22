export function isInteractionRequiredError(error) {
    if (error.name !== 'OAuthError') {
        return false;
    }
    const oauthError = error;
    return (oauthError.errorCode === 'interaction_required');
}
export function isAuthorizationCodeError(sdk, error) {
    if (error.name !== 'AuthApiError') {
        return false;
    }
    const authApiError = error;
    // xhr property doesn't seem to match XMLHttpRequest type
    const errorResponse = authApiError.xhr;
    const responseJSON = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.responseJSON;
    return sdk.options.pkce && ((responseJSON === null || responseJSON === void 0 ? void 0 : responseJSON.error) === 'invalid_grant');
}
