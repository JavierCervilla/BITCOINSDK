import type * as XCPAPI from "./api_2";
/**
 * A collection of Counterparty API methods.
 */
export declare const counterparty: {
    /**
     * Retrieves asset information from the Counterparty API.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIAsset>} The asset information.
     */
    getAsset: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIAsset>;
    /**
     * Retrieves the count of holders for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<number>} The number of holders.
     */
    getHoldersCount: ({ asset }: {
        asset: string;
    }) => Promise<number>;
    /**
     * Retrieves dispenses for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIDispense[]>} The list of dispenses.
     */
    getDispenses: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIDispense[]>;
    /**
     * Retrieves dispensers for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIDispenser[]>} The list of dispensers.
     */
    getDispensers: ({ asset }: {
        asset: string;
    }) => Promise<XCPAPI.XCPAPIDispenser[]>;
    /**
     * Retrieves the balance for a specific address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.address - The address to query.
     * @returns {Promise<XCPAPI.Balance[]>} The balance information.
     */
    getBalance: ({ address }: {
        address: string;
    }) => Promise<XCPAPI.Balance[]>;
    /**
     * Retrieves the token balance for a specific asset and address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The address to query.
     * @returns {Promise<XCPAPI.Balance[]>} The token balance information.
     */
    getTokenBalance: ({ asset, address }: {
        asset: string;
        address: string;
    }) => Promise<XCPAPI.Balance[]>;
    /**
     * Sends an asset to a destination address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The source address.
     * @param {string} params.destination - The destination address.
     * @param {number} params.amount - The amount to send.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
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
    /**
     * Sends an asset from a UTXO to a destination address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.utxo - The UTXO identifier.
     * @param {string} params.destination - The destination address.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
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
    /**
     * Attaches an asset to a UTXO.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The address to attach the asset to.
     * @param {number} params.amount - The amount to attach.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
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
    /**
     * Detaches an asset from a UTXO.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.utxo - The UTXO identifier.
     * @param {string} params.destination - The destination address.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
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
