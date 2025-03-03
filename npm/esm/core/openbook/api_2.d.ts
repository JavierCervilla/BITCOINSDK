import type * as OpenbookAPI from "./api";
/**
 * A collection of Openbook API methods.
 */
export declare const openbook: {
    /**
     * Fetches and adapts market data.
     * @returns {Promise<OpenbookAPI.MarketData[]>} - The adapted market data.
     */
    getMarketData: () => Promise<OpenbookAPI.MarketData[]>;
    /**
     * Fetches UTXOs for a given address.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @returns {Promise<any>} - The UTXOs for the address.
     */
    getUTXOS: ({ address }: {
        address: string;
    }) => Promise<OpenbookAPI.UTXO[]>;
    /**
     * Fetches the Bitcoin balance for a given address.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @returns {Promise<number>} - The Bitcoin balance.
     */
    getBTCBalance: ({ address }: {
        address: string;
    }) => Promise<number>;
    /**
     * Fetches atomic sales with optional pagination.
     * @param {Object} params - The parameters.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales.
     */
    getAtomicSales: ({ limit, page }: {
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    /**
     * Fetches atomic sales by asset with optional pagination.
     * @param {Object} params - The parameters.
     * @param {string} params.asset - The asset identifier.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales by asset.
     */
    getAtomicSalesByAsset: ({ asset, limit, page }: {
        asset: string;
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    /**
     * Fetches atomic sales by address with optional pagination.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales by address.
     */
    getAtomicSalesByAddress: ({ address, limit, page }: {
        address: string;
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    /**
     * Fetches an atomic sale by transaction ID.
     * @param {Object} params - The parameters.
     * @param {string} params.txid - The transaction ID.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sale.
     */
    getAtomicSaleByTxId: ({ txid }: {
        txid: string;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    /**
     * Fetches atomic swap orders with optional pagination.
     * @param {Object} params - The parameters.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>} - The atomic swap orders.
     */
    getAtomicSwapOrders: ({ limit, page }: {
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>;
    /**
     * Fetches atomic swap orders by asset.
     * @param {Object} params - The parameters.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>} - The atomic swap orders by asset.
     */
    getAtomicSwapOrdersByAsset: ({ asset }: {
        asset: string;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>;
    /**
     * Cancels an atomic swap order.
     * @param {Object} params - The parameters.
     * @param {string} params.id - The order ID.
     * @param {number} params.feeRate - The fee rate for the cancellation.
     * @returns {Promise<OpenbookAPI.OpenbookCancelOrder>} - The result of the cancellation.
     */
    cancelAtomicSwap: ({ id, feeRate }: {
        id: string;
        feeRate: number;
    }) => Promise<OpenbookAPI.OpenbookCancelOrder>;
    /**
     * Fetches a partially signed Bitcoin transaction (PSBT) for listing an order.
     * @param {Object} params - The parameters.
     * @param {string} params.utxo - The UTXO to use.
     * @param {string} params.seller - The seller's address.
     * @param {number} params.price - The price of the order.
     * @returns {Promise<OpenbookAPI.OpenbookPsbtForListOrder>} - The PSBT for the list order.
     */
    getPsbtForListOrder: ({ utxo, seller, price }: {
        utxo: string;
        seller: string;
        price: number;
    }) => Promise<OpenbookAPI.OpenbookPsbtForListOrder>;
    /**
     * Submits a PSBT for an on-chain order.
     * @param {Object} params - The parameters.
     * @param {string} params.utxo - The UTXO to use.
     * @param {string} params.seller - The seller's address.
     * @param {number} params.price - The price of the order.
     * @param {number} params.feeRate - The fee rate for the transaction.
     * @param {string} params.psbt - The PSBT to submit.
     * @returns {Promise<OpenbookAPI.OpenbookPsbtForListOrder>} - The result of the submission.
     */
    getPsbtForSubmitOrderOnchain: ({ utxo, seller, price, feeRate, psbt }: {
        utxo: string;
        seller: string;
        price: number;
        feeRate: number;
        psbt: string;
    }) => Promise<OpenbookAPI.OpenbookPsbtForListOrder>;
    /**
     * Fetches a PSBT for buying an order.
     * @param {Object} params - The parameters.
     * @param {string} params.id - The order ID.
     * @param {string} params.buyer - The buyer's address.
     * @param {number} params.feeRate - The fee rate for the transaction.
     * @param {OpenbookAPI.ServiceFee[]} [params.serviceFee] - The service fees.
     * @returns {Promise<OpenbookAPI.OpenbookPsbtForBuyOrder>} - The PSBT for the buy order.
     */
    getBuyOrderPSBT: ({ id, buyer, feeRate, serviceFee }: {
        buyer: string;
        id: string;
        feeRate: number;
        serviceFee: OpenbookAPI.ServiceFee[] | [];
    }) => Promise<OpenbookAPI.OpenbookPsbtForBuyOrder>;
    /**
     * Fetches the current Bitcoin price.
     * @returns {Promise<number | undefined>} - The current Bitcoin price or undefined if not found.
     */
    getBTCPrice: () => Promise<number | undefined>;
    utils: {
        /**
         * Fetches CIP25 JSON data from a given URL.
         * @param {Object} params - The parameters.
         * @param {string} params.cip25Url - The URL to fetch CIP25 data from.
         * @returns {Promise<any | null>} - The CIP25 data or null if an error occurs.
         */
        getCIP25JSON: ({ cip25Url }: {
            cip25Url: string;
        }) => Promise<any | null>;
        /**
         * Fetches mempool fee estimates.
         * @returns {Promise<OpenbookAPI.OpenbookMempoolFees | null>} - The mempool fees or null if an error occurs.
         */
        getMempoolFees: () => Promise<OpenbookAPI.OpenbookMempoolFees | null>;
    };
};
