import { getConfig } from '../config.js';
export const stamps = {
    getStamps: async () => {
        const endpoint = new URL(`${getConfig().STAMPS.ENDPOINT}/api/v2/stamps`);
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    }
};
