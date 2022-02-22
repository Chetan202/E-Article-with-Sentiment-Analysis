import { OktaAuth } from '../../types';
export declare function isInteractionRequiredError(error: Error): boolean;
export declare function isAuthorizationCodeError(sdk: OktaAuth, error: Error): boolean;
