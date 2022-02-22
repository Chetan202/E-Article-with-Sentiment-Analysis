function isObjectWithProperties(obj) {
    if (!obj || typeof obj !== 'object' || Object.values(obj).length === 0) {
        return false;
    }
    return true;
}
export function isOAuthTransactionMeta(obj) {
    if (!isObjectWithProperties(obj)) {
        return false;
    }
    return !!obj.redirectUri || !!obj.responseType;
}
export function isPKCETransactionMeta(obj) {
    if (!isOAuthTransactionMeta(obj)) {
        return false;
    }
    return !!obj.codeVerifier;
}
export function isIdxTransactionMeta(obj) {
    if (!isPKCETransactionMeta(obj)) {
        return false;
    }
    return !!obj.interactionHandle;
}
export function isCustomAuthTransactionMeta(obj) {
    if (!isObjectWithProperties(obj)) {
        return false;
    }
    const isAllStringValues = Object.values(obj).find((value) => (typeof value !== 'string')) === undefined;
    return isAllStringValues;
}
export function isTransactionMeta(obj) {
    if (isOAuthTransactionMeta(obj) || isCustomAuthTransactionMeta(obj)) {
        return true;
    }
    return false;
}
