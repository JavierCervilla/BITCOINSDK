import type * as OpenbookAPI from "./api";
/**
 * API for Openbook interaction
 */
export declare const openbook: {
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
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    getAtomicSalesByAsset: ({ asset, limit, page }: {
        asset: string;
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    getAtomicSalesByAddress: ({ address, limit, page }: {
        address: string;
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    getAtomicSaleByTxId: ({ txid }: {
        txid: string;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwap>>;
    getAtomicSwapOrders: ({ limit, page }: {
        limit?: number | undefined;
        page?: number | undefined;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>;
    getAtomicSwapOrdersByAsset: ({ asset }: {
        asset: string;
    }) => Promise<OpenbookAPI.PaginatedResponse<OpenbookAPI.OpenbookAtomicSwapOrder>>;
    cancelAtomicSwap: ({ id, feeRate }: {
        id: string;
        feeRate: number;
    }) => Promise<OpenbookAPI.OpenbookCancelOrder>;
    getPsbtForListOrder: ({ utxo, seller, price }: {
        utxo: string;
        seller: string;
        price: number;
    }) => Promise<OpenbookAPI.OpenbookPsbtForListOrder>;
    getPsbtForSubmitOrderOnchain: ({ utxo, seller, price, feeRate, psbt }: {
        utxo: string;
        seller: string;
        price: number;
        feeRate: number;
        psbt: string;
    }) => Promise<OpenbookAPI.OpenbookPsbtForListOrder>;
    getBuyOrderPSBT: ({ id, buyer, feeRate, serviceFee }: {
        buyer: string;
        id: string;
        feeRate: number;
        serviceFee: OpenbookAPI.ServiceFee[] | [];
    }) => Promise<OpenbookAPI.OpenbookPsbtForBuyOrder>;
    getBTCPrice: () => Promise<number | undefined>;
    utils: {
        getCIP25JSON: ({ cip25Url }: {
            cip25Url: string;
        }) => Promise<unknown>;
        getMempoolFees: () => Promise<OpenbookAPI.OpenbookMempoolFees | null>;
    };
};
