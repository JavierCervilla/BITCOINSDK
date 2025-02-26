import type * as XCPAPI from "./api_2";
export declare const counterparty: {
    getAsset: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIAsset>;
    getHoldersCount: ({ asset }: {
        asset: string;
    }) => Promise<number>;
    getDispenses: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIDispense[]>;
    getDispensers: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIDispenser[]>;
    getBalance: ({ address }: {
        address: string;
    }) => Promise<XCPAPI.Balance[]>;
    getTokenBalance: ({ asset, address }: {
        asset: string;
        address: string;
    }) => Promise<XCPAPI.Balance[]>;
    sendAsset: ({ asset, address, destination, amount }: {
        asset: string;
        address: string;
        destination: string;
        amount: number;
    }) => Promise<{
        psbt: string;
        inputsToSign: XCPAPI.InputToSign[];
        rawtransaction: string;
        btc_in: number;
        btc_out: number;
        btc_change: number;
        btc_fee: number;
        data: string;
        lock_scripts: string[];
        inputs_values: number[];
        signed_tx_estimated_size: XCPAPI.EstimatedSize;
        params: XCPAPI.SendAssetParams;
        name: string;
    }>;
    sendAssetInUTXO: ({ utxo, destination }: {
        utxo: string;
        destination: string;
    }) => Promise<{
        psbt: string;
        inputsToSign: XCPAPI.InputToSign[];
        rawtransaction: string;
        btc_in: number;
        btc_out: number;
        btc_change: number;
        btc_fee: number;
        data: string;
        lock_scripts: string[];
        inputs_values: number[];
        signed_tx_estimated_size: XCPAPI.EstimatedSize;
        params: XCPAPI.SendAssetParams;
        name: string;
    }>;
    attachToUTXO: ({ asset, address, amount }: {
        asset: string;
        address: string;
        amount: number;
    }) => Promise<{
        psbt: string;
        inputsToSign: XCPAPI.InputToSign[];
        rawtransaction: string;
        btc_in: number;
        btc_out: number;
        btc_change: number;
        btc_fee: number;
        data: string;
        lock_scripts: string[];
        inputs_values: number[];
        signed_tx_estimated_size: XCPAPI.EstimatedSize;
        params: XCPAPI.AttachToUTXOParams;
        name: string;
    }>;
    detachFromUTXO: ({ utxo, destination }: {
        utxo: string;
        destination: string;
    }) => Promise<{
        psbt: string;
        inputsToSign: XCPAPI.InputToSign[];
        rawtransaction: string;
        btc_in: number;
        btc_out: number;
        btc_change: number;
        btc_fee: number;
        data: string;
        lock_scripts: string[];
        inputs_values: number[];
        signed_tx_estimated_size: XCPAPI.EstimatedSize;
        params: XCPAPI.SendAssetParams;
        name: string;
    }>;
};
