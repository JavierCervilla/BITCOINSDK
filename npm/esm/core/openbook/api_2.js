import { getConfig } from "../config.js";
import { counterpartyImg, bitcoinImg } from "../../assets/index.js";
function BTCBalanceAdapter(data) {
    const balance = data.reduce((acc, item) => {
        const newAcc = !item.balance && item.value >= 546 ? acc + item.value : acc;
        return newAcc;
    }, 0);
    return balance * 10 ** -8;
}
function marketDataAdapter(data) {
    return data.map((item) => {
        const icon = item.id === "bitcoin" ? bitcoinImg : counterpartyImg;
        return {
            ...item,
            icon
        };
    });
}
function btcPriceAdapter(data) {
    const btc = data.find((item) => item.id === "bitcoin");
    return btc?.current_price;
}
/**
 * API for Openbook interaction
 */
export const openbook = {
    getMarketData: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`);
        const data = await fetch(endpoint);
        const mkdata = await data.json();
        return marketDataAdapter(mkdata);
    },
    getUTXOS: async ({ address }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return json.utxos;
    },
    getBTCBalance: async ({ address }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return BTCBalanceAdapter(json.utxos);
    },
    getAtomicSales: async ({ limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    getAtomicSalesByAsset: async ({ asset, limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/asset/${asset}`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    getAtomicSalesByAddress: async ({ address, limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/address/${address}`);
        endpoint.searchParams.set("limit", limit?.toString() || "100");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    getAtomicSaleByTxId: async ({ txid }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/tx/${txid}`);
        const data = await fetch(endpoint);
        const atomic_swap = await data.json();
        return atomic_swap;
    },
    getAtomicSwapOrders: async ({ limit, page }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders`);
        endpoint.searchParams.set("limit", limit?.toString() || "1000");
        endpoint.searchParams.set("page", page?.toString() || "1");
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
    getAtomicSwapOrdersByAsset: async ({ asset }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/asset/${asset}`);
        const data = await fetch(endpoint);
        const atomic_swaps = await data.json();
        return atomic_swaps;
    },
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
    getBTCPrice: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`);
        const data = await fetch(endpoint);
        const mkdata = await data.json();
        return btcPriceAdapter(mkdata);
    },
    utils: {
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
