import { getConfig } from "../config.js";
/**
 * Makes an RPC call to a Bitcoin Core node.
 *
 * @param {string} method - The RPC method to call.
 * @param {unknown[]} params - An array of parameters for the RPC method.
 * @returns {Promise<any>} A promise resolving to the RPC response.
 */
async function callRPC(method, params) {
    try {
        const rpcCall = {
            jsonrpc: "2.0",
            id: 1,
            method: method,
            params: params
        };
        const auth = btoa(`${getConfig().BITCOIN.RPC_USER}:${getConfig().BITCOIN.RPC_PASSWORD}`);
        const response = await fetch(getConfig().BITCOIN.ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
            body: JSON.stringify(rpcCall)
        });
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.error(e);
    }
}
/**
 * A collection of Bitcoin RPC methods.
 */
export const bitcoin = {
    /**
     * Retrieves the balance of a given Bitcoin address.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.address - The Bitcoin address to check.
     * @returns {Promise<any>} A promise resolving to the balance information.
     */
    getBalance: async ({ address }) => {
        return await callRPC("scantxoutset", ["start", address]);
    },
    /**
     * Fetches a raw Bitcoin transaction by its transaction ID.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.txid - The transaction ID to look up.
     * @param {boolean} params.verbose - Whether to return a verbose response.
     * @returns {Promise<any>} A promise resolving to the raw transaction details.
     */
    getRawTransaction: async ({ txid, verbose }) => {
        return await callRPC("getrawtransaction", [txid, verbose]);
    },
    /**
     * Retrieves recommended mempool fee rates from mempool.space API.
     *
     * @returns {Promise<any>} A promise resolving to the fee rate recommendations.
     */
    getMempoolFee: async () => {
        const endpoint = new URL("https://mempool.space/api/v1/fees/recommended");
        const data = await fetch(endpoint);
        return await data.json();
    },
    /**
     * Broadcasts a raw Bitcoin transaction to the network.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.txHex - The raw transaction hex to broadcast.
     * @returns {Promise<{result:string}>} A promise resolving to the transaction ID if successful.
     */
    sendRawTransaction: async ({ txHex }) => {
        return await callRPC("sendrawtransaction", [txHex]);
    },
    /**
     * Make a custom rpc call to the Bitcoin Core node.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.method - The RPC method to call.
     * @param {unknown[]} params.params - An array of parameters for the RPC method.
     * @returns {Promise<any>} A promise resolving to the RPC response.
     */
    customCallRPC: async ({ method, params }) => {
        return await callRPC(method, params);
    }
};
