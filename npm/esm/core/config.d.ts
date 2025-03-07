export declare const CONFIG: {
    VERSION: {
        MAJOR: number;
        MINOR: number;
        PATCH: number;
        STRING: string;
    };
    OPENBOOK: {
        ENDPOINT: string;
    };
    COUNTERPARTY: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
    STAMPS: {
        ENDPOINT: string;
    };
    ELECTRUM: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
    BITCOIN: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
};
export declare const getConfig: () => {
    VERSION: {
        MAJOR: number;
        MINOR: number;
        PATCH: number;
        STRING: string;
    };
    OPENBOOK: {
        ENDPOINT: string;
    };
    COUNTERPARTY: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
    STAMPS: {
        ENDPOINT: string;
    };
    ELECTRUM: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
    BITCOIN: {
        ENDPOINT: string;
        RPC_USER: string;
        RPC_PASSWORD: string;
    };
};
export declare function initConfig(customConfig?: Partial<typeof CONFIG>): void;
