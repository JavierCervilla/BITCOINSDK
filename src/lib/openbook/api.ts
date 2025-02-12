import { CONFIG } from "@/lib/config.ts";
import type { MarketData } from "@/types/openbook.d.ts";

import type * as OpenbookAPI from "./api.d.ts"

// @ts-ignore : No default export
import bitcoinIcon from "@/assets/bitcoin.png?url"
// @ts-ignore : No default export
import counterpartyIcon from "@/assets/counterparty.png?url"

function BTCBalanceAdapter(data: { balance: boolean, value: number }[]) {
    const balance = data.reduce((acc: number, item: { balance: boolean, value: number }) => {
        const newAcc = !item.balance && item.value >= 546 ? acc + item.value : acc;
        return newAcc;
    }, 0);
    return balance * 10 ** -8;
}

function marketDataAdapter(data: MarketData[]) {
    return data.map((item: MarketData) => {
        const icon = item.id === "bitcoin" ? bitcoinIcon : counterpartyIcon
        return {
            ...item,
            icon
        }
    })
}

export const openbook = {
    getMarketData: async () => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/market`)
        const data = await fetch(endpoint)
        const mkdata = await data.json()
        return marketDataAdapter(mkdata)
    },
    getUTXOS: async ({ address }: { address: string }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return json.utxos
    },
    getBTCBalance: async ({ address }: { address: string }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/xcp/utxos/${address}`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return BTCBalanceAdapter(json.utxos)
    },
    getAtomicSalesByAsset: async ({ asset, limit, page }: { asset: string, limit?: number, page?: number }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/asset/${asset}`)
        endpoint.searchParams.set("limit", limit?.toString() || "100")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSalesByAddress: async ({ address, limit, page }: { address: string, limit?: number, page?: number }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/address/${address}`)
        endpoint.searchParams.set("limit", limit?.toString() || "100")
        endpoint.searchParams.set("page", page?.toString() || "1")
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSaleByTxId: async ({ txid }: { txid: string }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/atomic-swaps/tx/${txid}`)
        const data = await fetch(endpoint)
        const atomic_swap = await data.json()
        return atomic_swap as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSwapOrders: async () => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/orders`)
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    getAtomicSwapOrdersByAsset: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/orders/asset/${asset}`)
        const data = await fetch(endpoint)
        const atomic_swaps = await data.json()
        return atomic_swaps as OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>
    },
    utils: {
        getCIP25JSON: async ({ cip25Url }: { cip25Url: string }) => {
            try {
                const endpoint = new URL(`${CONFIG.OPENBOOK.ENDPOINT}/api/v1/utils/cip25?url=${cip25Url}`)
                const data = await fetch(endpoint)
                const cip25 = await data.json()
                return cip25
            } catch {
                return null
            }
        }
    }

}