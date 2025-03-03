/**
 * A collection of Bitcoin Stamps API methods.
 */
export declare const stamps: {
    /**
     * Fetches a list of stamps from the configured endpoint.
     * @returns {Promise<any>} A promise that resolves to the list of stamps.
     */
    getStamps: () => Promise<unknown>;
    /**
     * Fetches the SRC20 balance for a given address.
     * @param {Object} params - The parameters for fetching the balance.
     * @param {string} params.address - The address to fetch the balance for.
     * @param {number} [params.limit=50] - The number of results to limit the response to.
     * @param {number} [params.page=1] - The page number to fetch.
     * @param {number} [params.amt=0] - The amount to filter the results by.
     * @returns {Promise<any>} A promise that resolves to the SRC20 balance.
     */
    getSRC20Balance: ({ address, limit, page, amt }: {
        address: string;
        limit: number;
        page: number;
        amt: number;
    }) => Promise<unknown>;
    /**
     * Fetches the stamps balance for a given address.
     * @param {Object} params - The parameters for fetching the balance.
     * @param {string} params.address - The address to fetch the balance for.
     * @param {number} [params.limit=50] - The number of results to limit the response to.
     * @param {number} [params.page=1] - The page number to fetch.
     * @returns {Promise<any>} A promise that resolves to the stamps balance.
     */
    getStampsBalance: ({ address, limit, page }: {
        address: string;
        limit: number;
        page: number;
    }) => Promise<unknown>;
};
