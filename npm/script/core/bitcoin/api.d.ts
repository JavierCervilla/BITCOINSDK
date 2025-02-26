export declare const bitcoin: {
    getBalance: ({ address }: {
        address: string;
    }) => Promise<unknown>;
    getRawTransaction: ({ txid, verbose }: {
        txid: string;
        verbose: boolean;
    }) => Promise<unknown>;
    getMempoolFee: () => Promise<unknown>;
    sendRawTransaction: ({ txHex }: {
        txHex: string;
    }) => Promise<unknown>;
};
