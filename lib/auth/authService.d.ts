export interface RequestMessage {
    address: string;
    chain: string;
    networkType: string;
}
export declare function requestMessage({ address, chain, networkType, }: {
    address: string;
    chain: string;
    networkType: 'evm';
}): Promise<string>;
export interface VerifyMessage {
    networkType: 'evm';
    signature: string;
    message: string;
}
export declare function verifyMessage({ networkType, signature, message }: VerifyMessage): Promise<{
    user: any;
    token: string;
}>;
