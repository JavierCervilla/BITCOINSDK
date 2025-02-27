import { initConfig } from "./config.js";
export declare const bitcoinsdk: {
    counterparty: {
        getAsset: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIAsset>;
        getHoldersCount: ({ asset }: {
            asset: string;
        }) => Promise<number>;
        getDispenses: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIDispense[]>;
        getDispensers: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIDispenser[]>;
        getBalance: ({ address }: {
            address: string;
        }) => Promise<import("./counterparty/api_2.js").Balance[]>;
        getTokenBalance: ({ asset, address }: {
            asset: string;
            address: string;
        }) => Promise<import("./counterparty/api_2.js").Balance[]>;
        sendAsset: ({ asset, address, destination, amount }: {
            asset: string;
            address: string;
            destination: string;
            amount: number;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
        sendAssetInUTXO: ({ utxo, destination }: {
            utxo: string;
            destination: string;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
        attachToUTXO: ({ asset, address, amount }: {
            asset: string;
            address: string;
            amount: number;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").AttachToUTXOParams;
            name: string;
        }>;
        detachFromUTXO: ({ utxo, destination }: {
            utxo: string;
            destination: string;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
    };
    openbook: {
        getMarketData: () => Promise<{
            icon: string;
            id: string;
            name: string;
            symbol: string;
            current_price: number;
            price_change_percentage_24h: number;
            total_volume: number;
            market_cap: number;
        }[]>;
        getUTXOS: ({ address }: {
            address: string;
        }) => Promise<any>;
        getBTCBalance: ({ address }: {
            address: string;
        }) => Promise<number>;
        getAtomicSales: ({ limit, page }: {
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSalesByAsset: ({ asset, limit, page }: {
            asset: string;
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSalesByAddress: ({ address, limit, page }: {
            address: string;
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSaleByTxId: ({ txid }: {
            txid: string;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSwapOrders: ({ limit, page }: {
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwapOrder>>;
        getAtomicSwapOrdersByAsset: ({ asset }: {
            asset: string;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwapOrder>>;
        cancelAtomicSwap: ({ id, feeRate }: {
            id: string;
            feeRate: number;
        }) => Promise<import("./openbook/api.js").OpenbookCancelOrder>;
        getPsbtForListOrder: ({ utxo, seller, price }: {
            utxo: string;
            seller: string;
            price: number;
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForListOrder>;
        getPsbtForSubmitOrderOnchain: ({ utxo, seller, price, feeRate, psbt }: {
            utxo: string;
            seller: string;
            price: number;
            feeRate: number;
            psbt: string;
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForListOrder>;
        getBuyOrderPSBT: ({ id, buyer, feeRate, serviceFee }: {
            buyer: string;
            id: string;
            feeRate: number;
            serviceFee: [] | import("./openbook/api.js").ServiceFee[];
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForBuyOrder>;
        getBTCPrice: () => Promise<number | undefined>;
        utils: {
            getCIP25JSON: ({ cip25Url }: {
                cip25Url: string;
            }) => Promise<unknown>;
            getMempoolFees: () => Promise<import("./openbook/api.js").OpenbookMempoolFees | null>;
        };
    };
    bitcoin: {
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
    stamps: {
        getStamps: () => Promise<unknown>;
        getSRC20Balance: ({ address, limit, page, amt }: {
            address: string;
            limit: number;
            page: number;
            amt: number;
        }) => Promise<unknown>;
        getStampsBalance: ({ address, limit, page }: {
            address: string;
            limit: number;
            page: number;
        }) => Promise<unknown>;
    };
    initConfig: typeof initConfig;
    getConfig: () => {
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
};
export type BitcoinSDK = typeof bitcoinsdk;
declare const _default: {
    counterparty: {
        getAsset: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIAsset>;
        getHoldersCount: ({ asset }: {
            asset: string;
        }) => Promise<number>;
        getDispenses: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIDispense[]>;
        getDispensers: ({ asset }: {
            asset: string;
        }) => Promise<import("./counterparty/api_2.js").XCPAPIDispenser[]>;
        getBalance: ({ address }: {
            address: string;
        }) => Promise<import("./counterparty/api_2.js").Balance[]>;
        getTokenBalance: ({ asset, address }: {
            asset: string;
            address: string;
        }) => Promise<import("./counterparty/api_2.js").Balance[]>;
        sendAsset: ({ asset, address, destination, amount }: {
            asset: string;
            address: string;
            destination: string;
            amount: number;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
        sendAssetInUTXO: ({ utxo, destination }: {
            utxo: string;
            destination: string;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
        attachToUTXO: ({ asset, address, amount }: {
            asset: string;
            address: string;
            amount: number;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").AttachToUTXOParams;
            name: string;
        }>;
        detachFromUTXO: ({ utxo, destination }: {
            utxo: string;
            destination: string;
        }) => Promise<{
            psbt: string;
            inputsToSign: import("./counterparty/api_2.js").InputToSign[];
            rawtransaction: string;
            btc_in: number;
            btc_out: number;
            btc_change: number;
            btc_fee: number;
            data: string;
            lock_scripts: string[];
            inputs_values: number[];
            signed_tx_estimated_size: import("./counterparty/api_2.js").EstimatedSize;
            params: import("./counterparty/api_2.js").SendAssetParams;
            name: string;
        }>;
    };
    openbook: {
        getMarketData: () => Promise<{
            icon: string;
            id: string;
            name: string;
            symbol: string;
            current_price: number;
            price_change_percentage_24h: number;
            total_volume: number;
            market_cap: number;
        }[]>;
        getUTXOS: ({ address }: {
            address: string;
        }) => Promise<any>;
        getBTCBalance: ({ address }: {
            address: string;
        }) => Promise<number>;
        getAtomicSales: ({ limit, page }: {
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSalesByAsset: ({ asset, limit, page }: {
            asset: string;
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSalesByAddress: ({ address, limit, page }: {
            address: string;
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSaleByTxId: ({ txid }: {
            txid: string;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwap>>;
        getAtomicSwapOrders: ({ limit, page }: {
            limit?: number | undefined;
            page?: number | undefined;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwapOrder>>;
        getAtomicSwapOrdersByAsset: ({ asset }: {
            asset: string;
        }) => Promise<import("./openbook/api.js").PaginatedResponse<import("./openbook/api.js").OpenbookAtomicSwapOrder>>;
        cancelAtomicSwap: ({ id, feeRate }: {
            id: string;
            feeRate: number;
        }) => Promise<import("./openbook/api.js").OpenbookCancelOrder>;
        getPsbtForListOrder: ({ utxo, seller, price }: {
            utxo: string;
            seller: string;
            price: number;
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForListOrder>;
        getPsbtForSubmitOrderOnchain: ({ utxo, seller, price, feeRate, psbt }: {
            utxo: string;
            seller: string;
            price: number;
            feeRate: number;
            psbt: string;
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForListOrder>;
        getBuyOrderPSBT: ({ id, buyer, feeRate, serviceFee }: {
            buyer: string;
            id: string;
            feeRate: number;
            serviceFee: [] | import("./openbook/api.js").ServiceFee[];
        }) => Promise<import("./openbook/api.js").OpenbookPsbtForBuyOrder>;
        getBTCPrice: () => Promise<number | undefined>;
        utils: {
            getCIP25JSON: ({ cip25Url }: {
                cip25Url: string;
            }) => Promise<unknown>;
            getMempoolFees: () => Promise<import("./openbook/api.js").OpenbookMempoolFees | null>;
        };
    };
    bitcoin: {
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
    stamps: {
        getStamps: () => Promise<unknown>;
        getSRC20Balance: ({ address, limit, page, amt }: {
            address: string;
            limit: number;
            page: number;
            amt: number;
        }) => Promise<unknown>;
        getStampsBalance: ({ address, limit, page }: {
            address: string;
            limit: number;
            page: number;
        }) => Promise<unknown>;
    };
    initConfig: typeof initConfig;
    getConfig: () => {
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
};
export default _default;
