/**
 * A collection of Bitcoin RPC methods.
 */
export declare const bitcoin: {
    /**
     * Retrieves the balance of a given Bitcoin address.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.address - The Bitcoin address to check.
     * @returns {Promise<any>} A promise resolving to the balance information.
     */
    getBalance: ({ address }: {
        address: string;
    }) => Promise<unknown>;
    /**
     * Fetches a raw Bitcoin transaction by its transaction ID.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.txid - The transaction ID to look up.
     * @param {boolean} params.verbose - Whether to return a verbose response.
     * @returns {Promise<any>} A promise resolving to the raw transaction details.
     */
    getRawTransaction: ({ txid, verbose }: {
        txid: string;
        verbose: boolean;
    }) => Promise<unknown>;
    /**
     * Retrieves recommended mempool fee rates from mempool.space API.
     *
     * @returns {Promise<any>} A promise resolving to the fee rate recommendations.
     */
    getMempoolFee: () => Promise<unknown>;
    /**
     * Broadcasts a raw Bitcoin transaction to the network.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.txHex - The raw transaction hex to broadcast.
     * @returns {Promise<{result:string}>} A promise resolving to the transaction ID if successful.
     */
    sendRawTransaction: ({ txHex }: {
        txHex: string;
    }) => Promise<{
        result: string;
    }>;
    /**
     * Make a custom rpc call to the Bitcoin Core node.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.method - The RPC method to call.
     * @param {unknown[]} params.params - An array of parameters for the RPC method.
     * @returns {Promise<any>} A promise resolving to the RPC response.
     */
    customCallRPC: ({ method, params }: {
        method: string;
        params: unknown[];
    }) => Promise<unknown>;
};
