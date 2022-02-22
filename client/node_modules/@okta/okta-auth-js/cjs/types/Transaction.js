"use strict";

exports.isOAuthTransactionMeta = isOAuthTransactionMeta;
exports.isPKCETransactionMeta = isPKCETransactionMeta;
exports.isIdxTransactionMeta = isIdxTransactionMeta;
exports.isCustomAuthTransactionMeta = isCustomAuthTransactionMeta;
exports.isTransactionMeta = isTransactionMeta;

// formerly known as "Redirect OAuth Params"
function isObjectWithProperties(obj) {
  if (!obj || typeof obj !== 'object' || Object.values(obj).length === 0) {
    return false;
  }

  return true;
}

function isOAuthTransactionMeta(obj) {
  if (!isObjectWithProperties(obj)) {
    return false;
  }

  return !!obj.redirectUri || !!obj.responseType;
}

function isPKCETransactionMeta(obj) {
  if (!isOAuthTransactionMeta(obj)) {
    return false;
  }

  return !!obj.codeVerifier;
}

function isIdxTransactionMeta(obj) {
  if (!isPKCETransactionMeta(obj)) {
    return false;
  }

  return !!obj.interactionHandle;
}

function isCustomAuthTransactionMeta(obj) {
  if (!isObjectWithProperties(obj)) {
    return false;
  }

  const isAllStringValues = Object.values(obj).find(value => typeof value !== 'string') === undefined;
  return isAllStringValues;
}

function isTransactionMeta(obj) {
  if (isOAuthTransactionMeta(obj) || isCustomAuthTransactionMeta(obj)) {
    return true;
  }

  return false;
}
//# sourceMappingURL=Transaction.js.map