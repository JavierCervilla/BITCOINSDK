const VERSION_CONFIG = () => {
    const MAJOR = 0;
    const MINOR = 0;
    const PATCH = 0;
    return {
        MAJOR,
        MINOR,
        PATCH,
        STRING: `${MAJOR}.${MINOR}.${PATCH}`
    };
};

const OPENBOOK_PROTOCOL_CONFIG = () => {
    const OPENBOOK_ENDPOINT = "https://openbook.0.srcpad.pro"

    return {
        ENDPOINT: OPENBOOK_ENDPOINT
    }
};

const COUNTERPARTY_CONFIG = () => {
    const COUNTERPARTY_ENDPOINT = "https://counterparty.0.srcpad.pro"
    const RPC_USER = "rpc"
    const RPC_PASSWORD = "rpc"

    return {
        ENDPOINT: COUNTERPARTY_ENDPOINT,
        RPC_USER,
        RPC_PASSWORD
    }
}

const BITCOIN_CONFIG = () => {
    const BITCOIN_ENDPOINT = "https://bitcoin.0.srcpad.pro"
    const RPC_USER = "rpc"
    const RPC_PASSWORD = "rpc"

    return {
        ENDPOINT: BITCOIN_ENDPOINT,
        RPC_USER,
        RPC_PASSWORD
    }
}

const ELECTRUM_CONFIG = () => {
    const ELECTRUM_ENDPOINT = "https://fulcrum.0.srcpad.pro"
    const ELECTRUM_RPC_USER = "rpc"
    const ELECTRUM_RPC_PASSWORD = "rpc"
    return {
        ENDPOINT: ELECTRUM_ENDPOINT,
        RPC_USER: ELECTRUM_RPC_USER,
        RPC_PASSWORD: ELECTRUM_RPC_PASSWORD
    }
}

const STAMPS_CONFIG = () => {
    const STAMPS_ENDPOINT = "https://stamps.0.srcpad.pro"
    return {
        ENDPOINT: STAMPS_ENDPOINT
    }
}

export const CONFIG = {
    VERSION: VERSION_CONFIG(),
    OPENBOOK: OPENBOOK_PROTOCOL_CONFIG(),
    COUNTERPARTY: COUNTERPARTY_CONFIG(),
    STAMPS: STAMPS_CONFIG(),
    ELECTRUM: ELECTRUM_CONFIG(),
    BITCOIN: BITCOIN_CONFIG()
}