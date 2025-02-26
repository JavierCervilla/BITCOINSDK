"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitcoin = void 0;
const config_js_1 = require("../config.js");
async function callRPC(method, params) {
    try {
        const rpcCall = {
            jsonrpc: "2.0",
            id: 1,
            method: method,
            params: params
        };
        const auth = btoa(`${(0, config_js_1.getConfig)().BITCOIN.RPC_USER}:${(0, config_js_1.getConfig)().BITCOIN.RPC_PASSWORD}`);
        const response = await fetch((0, config_js_1.getConfig)().BITCOIN.ENDPOINT, {
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
exports.bitcoin = {
    getBalance: async ({ address }) => {
        const data = await callRPC("scantxoutset", ["start", address]);
        return data;
    },
    getRawTransaction: async ({ txid, verbose }) => {
        const data = await callRPC("getrawtransaction", [txid, verbose]);
        return data;
    },
    getMempoolFee: async () => {
        const endpoint = new URL('https://mempool.space/api/v1/fees/recommended');
        const data = await fetch(endpoint);
        const json = await data.json();
        return json;
    },
    sendRawTransaction: async ({ txHex }) => {
        const data = await callRPC("sendrawtransaction", [txHex]);
        return data;
    }
};
