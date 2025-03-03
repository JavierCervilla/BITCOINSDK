import { getConfig } from "../config.js";
import { counterpartyImg, bitcoinImg } from "../../assets/index.js";
/**
 * Adapts raw balance data to a Bitcoin balance.
 * @param {Array<{ balance: boolean, value: number }>} data - The raw balance data.
 * @returns {number} - The adapted Bitcoin balance.
 */
function BTCBalanceAdapter(data) {
    const balance = data.reduce((acc, item) => {
        const newAcc = !item.balance && item.value >= 546 ? acc + item.value : acc;
        return newAcc;
    }, 0);
    return balance * 10 ** -8;
}
/**
 * Adapts market data to include icons.
 * @param {OpenbookAPI.MarketData[]} data - The raw market data.
 * @returns {OpenbookAPI.MarketData[]} - The adapted market data with icons.
 */
function marketDataAdapter(data) {
    return data.map((item) => {
        const icon = item.id === "bitcoin" ? bitcoinImg : counterpartyImg;
        return {
            ...item,
            icon
        };
    });
}
/**
 * Extracts the current Bitcoin price from market data.
 * @param {OpenbookAPI.MarketData[]} data - The raw market data.
 * @returns {number | undefined} - The current Bitcoin price or undefined if not found.
 */
function btcPriceAdapter(data) {
    const btc = data.find((item) => item.id === "bitcoin");
    return btc?.current_price;
}
/**
 * A collection of Openbook API methods.
 */
export const openbook = {
    /**
     * Fetches and adapts market data.
     * @returns {Promise<OpenbookAPI.MarketData[]>} - The adapted market data.
     */
    getMarketData: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`);
        const data = await fetch(endpoint);
        const mkdata = await data.json();
        return marketDataAdapter(mkdata);
    },
    /**
     * Fetches UTXOs for a given address.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @returns {Promise<any>} - The UTXOs for the address.
     */
    getUTXOS: async ({ address }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return json.utxos;
    },
    /**
     * Fetches the Bitcoin balance for a given address.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @returns {Promise<number>} - The Bitcoin balance.
     */
    getBTCBalance: async ({ address }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return BTCBalanceAdapter(json.utxos);
    },
    /**
     * Fetches atomic sales with optional pagination.
     * @param {Object} params - The parameters.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales.
     */
    getAtomicSales: async ({ limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    /**
     * Fetches atomic sales by asset with optional pagination.
     * @param {Object} params - The parameters.
     * @param {string} params.asset - The asset identifier.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales by asset.
     */
    getAtomicSalesByAsset: async ({ asset, limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/asset/${asset}`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    /**
     * Fetches atomic sales by address with optional pagination.
     * @param {Object} params - The parameters.
     * @param {string} params.address - The Bitcoin address.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sales by address.
     */
    getAtomicSalesByAddress: async ({ address, limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/address/${address}`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    /**
     * Fetches an atomic sale by transaction ID.
     * @param {Object} params - The parameters.
     * @param {string} params.txid - The transaction ID.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>} - The atomic sale.
     */
    getAtomicSaleByTxId: async ({ txid }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/tx/${txid}`);
        const data = await fetch(endpoint);
        const atomic_swap = await data.json();
        return atomic_swap;
    },
    /**
     * Fetches atomic swap orders with optional pagination.
     * @param {Object} params - The parameters.
     * @param {number} [params.limit] - The number of results to return.
     * @param {number} [params.page] - The page number to return.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>} - The atomic swap orders.
     */
    getAtomicSwapOrders: async ({ limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders`);
        endpoint.searchParams.set("limit", limit?.toString() || "1000");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    /**
     * Fetches atomic swap orders by asset.
     * @param {Object} params - The parameters.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>} - The atomic swap orders by asset.
     */
    getAtomicSwapOrdersByAsset: async ({ asset }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/asset/${asset}`);
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    /**
     * Cancels an atomic swap order.
     * @param {Object} params - The parameters.
     * @param {string} params.id - The order ID.
     * @param {number} params.feeRate - The fee rate for the cancellation.
     * @returns {Promise<OpenbookAPI.OpenbookCancelOrder>} - The result of the cancellation.
     */
    cancelAtomicSwap: async ({ id, feeRate }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/cancel`);
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                feeRate: feeRate
            })
        });
        const atomic_swap = await data.json();
        return atomic_swap;
    },
    /**
     * Fetches a partially signed Bitcoin transaction (PSBT) for listing an order.
     * @param {Object} params - The parameters.
     * @param {string} params.utxo - The UTXO to use.
     * @param {string} params.seller - The seller's address.
     * @param {number} params.price - The price of the order.
     * @returns {Promise<OpenbookAPI.OpenbookPsbtForListOrder>} - The PSBT for the list order.
     */
    getPsbtForListOrder: async ({ utxo, seller, price }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/list/sign`);
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ utxo, seller, price })
        });
        const atomic_swap = await data.json();
        return atomic_swap;
    },
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
    getPsbtForSubmitOrderOnchain: async ({ utxo, seller, price, feeRate, psbt }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/list/submit`);
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ utxo, seller, price, feeRate, psbt })
        });
        const atomic_swap = await data.json();
        return atomic_swap;
    },
    /**
     * Fetches a PSBT for buying an order.
     * @param {Object} params - The parameters.
     * @param {string} params.id - The order ID.
     * @param {string} params.buyer - The buyer's address.
     * @param {number} params.feeRate - The fee rate for the transaction.
     * @param {OpenbookAPI.ServiceFee[]} [params.serviceFee] - The service fees.
     * @returns {Promise<OpenbookAPI.OpenbookPsbtForBuyOrder>} - The PSBT for the buy order.
     */
    getBuyOrderPSBT: async ({ id, buyer, feeRate, serviceFee = [] }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/buy`);
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, buyer, feeRate, serviceFee })
        });
        const atomic_swap = await data.json();
        return atomic_swap;
    },
    /**
     * Fetches the current Bitcoin price.
     * @returns {Promise<number | undefined>} - The current Bitcoin price or undefined if not found.
     */
    getBTCPrice: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`);
        const data = await fetch(endpoint);
        const mkdata = await data.json();
        return btcPriceAdapter(mkdata);
    },
    utils: {
        /**
         * Fetches CIP25 JSON data from a given URL.
         * @param {Object} params - The parameters.
         * @param {string} params.cip25Url - The URL to fetch CIP25 data from.
         * @returns {Promise<any | null>} - The CIP25 data or null if an error occurs.
         */
        getCIP25JSON: async ({ cip25Url }) => {
            try {
                const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/utils/cip25?url=${cip25Url}`);
                const data = await fetch(endpoint);
                const cip25 = await data.json();
                return cip25;
            }
            catch {
                return null;
            }
        },
        /**
         * Fetches mempool fee estimates.
         * @returns {Promise<OpenbookAPI.OpenbookMempoolFees | null>} - The mempool fees or null if an error occurs.
         */
        getMempoolFees: async () => {
            try {
                const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/utils/mempool-fees`);
                const data = await fetch(endpoint);
                const mempoolFees = await data.json();
                return mempoolFees;
            }
            catch {
                return null;
            }
        },
    }
};
