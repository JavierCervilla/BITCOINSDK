const VERSION_CONFIG = () => {
    const MAJOR = 0;
    const MINOR = 1;
    const PATCH = 1;
    return {
        MAJOR,
        MINOR,
        PATCH,
        STRING: `${MAJOR}.${MINOR}.${PATCH}`,
    };
};

const OPENBOOK_PROTOCOL_CONFIG = () => ({
    ENDPOINT: "https://openbook.0.srcpad.pro",
});

const COUNTERPARTY_CONFIG = () => ({
    ENDPOINT: "https://counterparty.0.srcpad.pro",
    RPC_USER: "rpc",
    RPC_PASSWORD: "rpc",
});

const BITCOIN_CONFIG = () => ({
    ENDPOINT: "https://bitcoin.0.srcpad.pro",
    RPC_USER: "rpc",
    RPC_PASSWORD: "rpc",
});

const ELECTRUM_CONFIG = () => ({
    ENDPOINT: "https://fulcrum.0.srcpad.pro",
    RPC_USER: "rpc",
    RPC_PASSWORD: "rpc",
});

const STAMPS_CONFIG = () => ({
    ENDPOINT: "https://stamps.0.srcpad.pro",
});

export const CONFIG = {
    VERSION: VERSION_CONFIG(),
    OPENBOOK: OPENBOOK_PROTOCOL_CONFIG(),
    COUNTERPARTY: COUNTERPARTY_CONFIG(),
    STAMPS: STAMPS_CONFIG(),
    ELECTRUM: ELECTRUM_CONFIG(),
    BITCOIN: BITCOIN_CONFIG(),
};

export const getConfig = () => CONFIG;

export function initConfig(customConfig: Partial<typeof CONFIG> = {}) {
    Object.assign(CONFIG, {
        ...customConfig,
        OPENBOOK: { ...CONFIG.OPENBOOK, ...customConfig.OPENBOOK },
        COUNTERPARTY: { ...CONFIG.COUNTERPARTY, ...customConfig.COUNTERPARTY },
        BITCOIN: { ...CONFIG.BITCOIN, ...customConfig.BITCOIN },
        ELECTRUM: { ...CONFIG.ELECTRUM, ...customConfig.ELECTRUM },
        STAMPS: { ...CONFIG.STAMPS, ...customConfig.STAMPS },
    });
}