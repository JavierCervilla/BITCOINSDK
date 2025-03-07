"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stamps = void 0;
const config_js_1 = require("../config.js");
/**
 * A collection of Bitcoin Stamps API methods.
 */
exports.stamps = {
    /**
     * Fetches a list of stamps from the configured endpoint.
     * @returns {Promise<any>} A promise that resolves to the list of stamps.
     */
    getStamps: async () => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().STAMPS.ENDPOINT}/api/v2/stamps`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    },
    /**
     * Fetches the SRC20 balance for a given address.
     * @param {Object} params - The parameters for fetching the balance.
     * @param {string} params.address - The address to fetch the balance for.
     * @param {number} [params.limit=50] - The number of results to limit the response to.
     * @param {number} [params.page=1] - The page number to fetch.
     * @param {number} [params.amt=0] - The amount to filter the results by.
     * @returns {Promise<any>} A promise that resolves to the SRC20 balance.
     */
    getSRC20Balance: async ({ address, limit = 50, page = 1, amt = 0 }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().STAMPS.ENDPOINT}/api/v2/src20/balance/${address}`);
        endpoint.searchParams.set("limit", limit.toString());
        endpoint.searchParams.set("page", page.toString());
        endpoint.searchParams.set("amt", amt.toString());
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    },
    /**
     * Fetches the stamps balance for a given address.
     * @param {Object} params - The parameters for fetching the balance.
     * @param {string} params.address - The address to fetch the balance for.
     * @param {number} [params.limit=50] - The number of results to limit the response to.
     * @param {number} [params.page=1] - The page number to fetch.
     * @returns {Promise<any>} A promise that resolves to the stamps balance.
     */
    getStampsBalance: async ({ address, limit = 50, page = 1 }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().STAMPS.ENDPOINT}/api/v2/stamps/balance/${address}`);
        endpoint.searchParams.set("limit", limit.toString());
        endpoint.searchParams.set("page", page.toString());
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    }
};
