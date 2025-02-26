"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterparty = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const config_js_1 = require("../config.js");
const api_js_1 = require("../bitcoin/api.js");
const hex = __importStar(require("../utils/hex.js"));
function balanceAdapter(data) {
    return data.map((item) => {
        return {
            asset: item.asset,
            qty: item.quantity,
            qty_normalized: item.quantity_normalized,
            description: item.asset_info?.description ?? null,
            name: item.asset_info?.asset_longname ?? item.asset,
            divisible: item.asset_info?.divisible,
            locked: item.asset_info?.locked,
            utxo: item.utxo ?? null,
            address: item.address ?? null,
            utxo_address: item.utxo_address ?? null,
        };
    });
}
async function composeAdapter(rawTransaction) {
    try {
        const psbt = new bitcoin.Psbt();
        const tx = bitcoin.Transaction.fromHex(rawTransaction);
        const inputsToSign = [];
        let index = 0;
        for (const input of tx.ins) {
            const txid = hex.bin2hex(input.hash.reverse());
            const { result: raw_tx } = await api_js_1.bitcoin.getRawTransaction({ txid, verbose: false });
            const prevTx = bitcoin.Transaction.fromHex(raw_tx);
            const output = prevTx.outs[input.index];
            const address = bitcoin.address.fromOutputScript(output.script, bitcoin.networks.bitcoin);
            const isSegWit = output.script.length === 22 && output.script[0] === 0;
            psbt.addInput({
                hash: txid,
                index: Number(input.index),
                ...(isSegWit
                    ? { witnessUtxo: output }
                    : { nonWitnessUtxo: hex.hex2bin(raw_tx) })
            });
            psbt.updateInput(index, {
                sighashType: bitcoin.Transaction.SIGHASH_ALL
            });
            inputsToSign.push({
                address,
                index: index,
                sighashTypes: [bitcoin.Transaction.SIGHASH_ALL]
            });
            index++;
        }
        for (const output of tx.outs) {
            psbt.addOutput(output);
        }
        return {
            psbt: psbt.toHex(),
            inputsToSign
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.counterparty = {
    getAsset: async ({ asset }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}`);
        endpoint.searchParams.set("verbose", "true");
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.result;
    },
    getHoldersCount: async ({ asset }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/holders`);
        endpoint.searchParams.set("verbose", "true");
        endpoint.searchParams.set("limit", "0");
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.result_count;
    },
    getDispenses: async ({ asset }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispenses`);
        endpoint.searchParams.set("verbose", "true");
        endpoint.searchParams.set("limit", "10000");
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.result;
    },
    getDispensers: async ({ asset }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispensers`);
        endpoint.searchParams.set("verbose", "true");
        endpoint.searchParams.set("limit", "10000");
        endpoint.searchParams.set("status", "open");
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.result;
    },
    getBalance: async ({ address }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances`);
        endpoint.searchParams.set("verbose", "true");
        const data = await fetch(endpoint);
        const balances = await data.json();
        return balanceAdapter(balances.result);
    },
    getTokenBalance: async ({ asset, address }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances/${asset}`);
        endpoint.searchParams.set("verbose", "true");
        const data = await fetch(endpoint);
        const balances = await data.json();
        return balanceAdapter(balances.result);
    },
    sendAsset: async ({ asset, address, destination, amount }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/send`);
        endpoint.searchParams.set("asset", asset);
        endpoint.searchParams.set("use_enhanced_send", "true");
        endpoint.searchParams.set("address", address);
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("destination", destination);
        endpoint.searchParams.set("quantity", amount.toString());
        const response = await fetch(endpoint);
        const data = await response.json();
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        };
    },
    sendAssetInUTXO: async ({ utxo, destination }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/utxos/${utxo}/compose/movetoutxo`);
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("destination", destination);
        const response = await fetch(endpoint);
        const data = await response.json();
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        };
    },
    attachToUTXO: async ({ asset, address, amount }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/attach`);
        endpoint.searchParams.set("asset", asset);
        endpoint.searchParams.set("address", address);
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("quantity", amount.toString());
        endpoint.searchParams.set("utxo_value", "546");
        const response = await fetch(endpoint);
        const data = await response.json();
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        };
    },
    detachFromUTXO: async ({ utxo, destination }) => {
        const endpoint = new URL(`${(0, config_js_1.getConfig)().COUNTERPARTY.ENDPOINT}/v2/utxos/${utxo}/compose/detach`);
        endpoint.searchParams.set("destination", destination);
        endpoint.searchParams.set("verbose", "True");
        const response = await fetch(endpoint);
        const data = await response.json();
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        };
    }
};
