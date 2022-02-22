import { TokenManager } from '../TokenManager';
import { TokenManagerOptions } from '../types';
export declare class TokenService {
    private tokenManager;
    private options;
    private storageListener;
    private onTokenExpiredHandler;
    private syncTimeout;
    constructor(tokenManager: TokenManager, options?: TokenManagerOptions);
    start(): void;
    stop(): void;
}
