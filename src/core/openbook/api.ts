import { getConfig } from "@/core/config.ts"
import { counterpartyImg, bitcoinImg } from "@/assets/index.ts";

import type * as OpenbookAPI from "@/core//openbook/api.d.ts"

function BTCBalanceAdapter(data: { balance: boolean, value: number }[]) {
    const balance = data.reduce((acc: number, item: { balance: boolean, value: number }) => {
        const newAcc = !item.balance && item.value >= 546 ? acc + item.value : acc;
        return newAcc;
    }, 0);
    return balance * 10 ** -8;
}

function marketDataAdapter(data: OpenbookAPI.MarketData[]) {
    return data.map((item: OpenbookAPI.MarketData) => {
        const icon = item.id === "bitcoin" ? bitcoinImg : counterpartyImg
        return {
            ...item,
            icon
        }
    })
}

function btcPriceAdapter(data: OpenbookAPI.MarketData[]) {
    const btc = data.find((item: OpenbookAPI.MarketData) => item.id === "bitcoin")
    return btc?.current_price
}

export const openbook = {
    getMarketData: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`)
        const data = await fetch(endpoint)
        const mkdata = await data.json()
        return marketDataAdapter(mkdata)
    },
    getUTXOS: async ({ address }: { address: string }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return json.utxos
    },
    getBTCBalance: async ({ address }: { address: string }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return BTCBalanceAdapter(json.utxos)
    },
    getAtomicSales: async ({ limit, page }: { limit?: number, page?: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps`)
        endpoint.searchParams.set("limit", limit?.toString() || "100")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSalesByAsset: async ({ asset, limit, page }: { asset: string, limit?: number, page?: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/asset/${asset}`)
        endpoint.searchParams.set("limit", limit?.toString() || "100")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSalesByAddress: async ({ address, limit, page }: { address: string, limit?: number, page?: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/address/${address}`)
        endpoint.searchParams.set("limit", limit?.toString() || "100")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSaleByTxId: async ({ txid }: { txid: string }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/tx/${txid}`)
        const data = await fetch(endpoint)
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSwapOrders: async ({ limit, page }: { limit?: number, page?: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders`)
        endpoint.searchParams.set("limit", limit?.toString() || "1000")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>
    },
    getAtomicSwapOrdersByAsset: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/asset/${asset}`)
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json();
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>
    },
    cancelAtomicSwap: async ({ id, feeRate }: { id: string, feeRate: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/cancel`)
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                feeRate: feeRate
            })
        })
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.OpenbookCancelOrder
    },
    getPsbtForListOrder: async ({ utxo, seller, price }: { utxo: string, seller: string, price: number }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/list/sign`)
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ utxo, seller, price })
        })
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.OpenbookPsbtForListOrder
    },
    getPsbtForSubmitOrderOnchain: async ({ utxo, seller, price, feeRate, psbt }: { utxo: string, seller: string, price: number, feeRate: number, psbt: string }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/list/submit`)
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ utxo, seller, price, feeRate, psbt })
        })
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.OpenbookPsbtForListOrder
    },
    getBuyOrderPSBT: async ({ id, buyer, feeRate, serviceFee = [] }: {
        buyer: string;
        id: string;
        feeRate: number;
        serviceFee: OpenbookAPI.ServiceFee[] | [];
    }) => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/orders/buy`)
        const data = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, buyer, feeRate, serviceFee })
        })
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.OpenbookPsbtForBuyOrder
    },
    getBTCPrice: async () => {
        const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/market`)
        const data = await fetch(endpoint)
        const mkdata = await data.json()
        return btcPriceAdapter(mkdata)
    },
    utils: {
        getCIP25JSON: async ({ cip25Url }: { cip25Url: string }) => {
            try {
                const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/utils/cip25?url=${cip25Url}`)
                const data = await fetch(endpoint)
                const cip25 = await data.json()
                return cip25
            } catch {
                return null
            }
        },
        getMempoolFees: async () => {
            try {
                const endpoint = new URL(`${getConfig().OPENBOOK.ENDPOINT}/api/v1/utils/mempool-fees`)
                const data = await fetch(endpoint)
                const mempoolFees = await data.json()
                return mempoolFees as OpenbookAPI.OpenbookMempoolFees
            } catch {
                return null
            }
        },
    }

}