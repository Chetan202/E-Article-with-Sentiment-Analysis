import { CustomUrls, OAuthResponse, RefreshToken, TokenParams } from '../../types';
export declare function postToTokenEndpoint(sdk: any, options: TokenParams, urls: CustomUrls): Promise<OAuthResponse>;
export declare function postRefreshToken(sdk: any, options: TokenParams, refreshToken: RefreshToken): Promise<OAuthResponse>;
