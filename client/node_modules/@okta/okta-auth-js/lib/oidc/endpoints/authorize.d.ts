import { OAuthParams, TokenParams } from '../../types';
export declare function convertTokenParamsToOAuthParams(tokenParams: TokenParams): OAuthParams;
export declare function buildAuthorizeParams(tokenParams: TokenParams): string;
