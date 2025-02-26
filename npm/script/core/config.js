"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfig = exports.getConfig = exports.CONFIG = void 0;
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
exports.CONFIG = {
    VERSION: VERSION_CONFIG(),
    OPENBOOK: OPENBOOK_PROTOCOL_CONFIG(),
    COUNTERPARTY: COUNTERPARTY_CONFIG(),
    STAMPS: STAMPS_CONFIG(),
    ELECTRUM: ELECTRUM_CONFIG(),
    BITCOIN: BITCOIN_CONFIG(),
};
const getConfig = () => exports.CONFIG;
exports.getConfig = getConfig;
function initConfig(customConfig = {}) {
    Object.assign(exports.CONFIG, {
        ...customConfig,
        VERSION: { ...exports.CONFIG.VERSION, ...customConfig.VERSION },
        OPENBOOK: { ...exports.CONFIG.OPENBOOK, ...customConfig.OPENBOOK },
        COUNTERPARTY: { ...exports.CONFIG.COUNTERPARTY, ...customConfig.COUNTERPARTY },
        BITCOIN: { ...exports.CONFIG.BITCOIN, ...customConfig.BITCOIN },
        ELECTRUM: { ...exports.CONFIG.ELECTRUM, ...customConfig.ELECTRUM },
        STAMPS: { ...exports.CONFIG.STAMPS, ...customConfig.STAMPS },
    });
}
exports.initConfig = initConfig;
