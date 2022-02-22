import StorageManager from '../StorageManager';
import { CustomUrls } from './OktaAuthOptions';
export interface TransactionManagerOptions {
    storageManager: StorageManager;
    legacyWidgetSupport?: boolean;
    saveNonceCookie?: boolean;
    saveStateCookie?: boolean;
    saveParamsCookie?: boolean;
}
export interface TransactionMetaOptions {
    pkce?: boolean;
    oauth?: boolean;
}
export interface OAuthTransactionMeta {
    issuer: string;
    redirectUri: string;
    state: string;
    nonce: string;
    responseType: string | string[];
    scopes: string[];
    clientId: string;
    urls: CustomUrls;
    ignoreSignature: boolean;
}
export interface PKCETransactionMeta extends OAuthTransactionMeta {
    codeVerifier: string;
    codeChallengeMethod: string;
    codeChallenge: string;
}
export interface IdxTransactionMeta extends PKCETransactionMeta {
    interactionHandle?: string;
}
export declare type CustomAuthTransactionMeta = Record<string, string | undefined>;
export declare type TransactionMeta = IdxTransactionMeta | PKCETransactionMeta | OAuthTransactionMeta | CustomAuthTransactionMeta;
export declare function isOAuthTransactionMeta(obj: any): obj is OAuthTransactionMeta;
export declare function isPKCETransactionMeta(obj: any): obj is PKCETransactionMeta;
export declare function isIdxTransactionMeta(obj: any): obj is IdxTransactionMeta;
export declare function isCustomAuthTransactionMeta(obj: any): obj is CustomAuthTransactionMeta;
export declare function isTransactionMeta(obj: any): obj is TransactionMeta;
