import * as bitcoin from "bitcoinjs-lib"

import { getConfig } from "../config.js";
import { bitcoin as rpc } from "../bitcoin/api.js";
import type * as XCPAPI from "./api_2";
import * as hex from "../utils/hex.js";


/**
 * Adapts the balance data from the Counterparty API to the internal format.
 * @param {XCPAPI.XCPAPIBalance[]} data - The balance data from the Counterparty API.
 * @returns {XCPAPI.Balance[]} The adapted balance data.
 */
function balanceAdapter(data: XCPAPI.XCPAPIBalance[]) {
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
        } as XCPAPI.Balance
    })
}

/**
 * Composes a transaction from a raw transaction string.
 * @param {string} rawTransaction - The raw transaction in hexadecimal format.
 * @returns {Promise<{ psbt: string, inputsToSign: InputToSign[] }>} The composed transaction and inputs to sign.
 * @throws Will throw an error if the transaction composition fails.
 */
async function composeAdapter(rawTransaction: string) {
    try {
        const psbt = new bitcoin.Psbt()
        const tx = bitcoin.Transaction.fromHex(rawTransaction)
        const inputsToSign: XCPAPI.InputToSign[] = []
        let index = 0;
        for (const input of tx.ins) {
            const txid = hex.bin2hex(input.hash.reverse());
            const { result: raw_tx } = await rpc.getRawTransaction({ txid, verbose: false });
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
            })
            inputsToSign.push({
                address,
                index: index,
                sighashTypes: [bitcoin.Transaction.SIGHASH_ALL]
            })
            index++;
        }
        for (const output of tx.outs) {
            psbt.addOutput(output)
        }
        return {
            psbt: psbt.toHex(),
            inputsToSign
        };
    } catch (error) {
        console.error(error)
        throw error
    }
}
/**
 * A collection of Counterparty API methods.
 */
export const counterparty = {
    /**
     * Retrieves asset information from the Counterparty API.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIAsset>} The asset information.
     */
    getAsset: async ({ asset }: { asset: string }): Promise<XCPAPI.XCPAPIAsset> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}`)
        endpoint.searchParams.set("verbose", "true")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIAsset }
        return data.result;
    },
    /**
     * Retrieves the count of holders for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<number>} The number of holders.
     */
    getHoldersCount: async ({ asset }: { asset: string }): Promise<number> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/holders`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "0")
        const response = await fetch(endpoint)
        const data = await response.json() as { result_count: number }
        return data.result_count as number;
    },
    /**
     * Retrieves dispenses for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIDispense[]>} The list of dispenses.
     */
    getDispenses: async ({ asset }: { asset: string }): Promise<XCPAPI.XCPAPIDispense[]> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispenses`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "10000")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIDispense[] }
        return data.result;
    },
    /**
     * Retrieves dispensers for a specific asset.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @returns {Promise<XCPAPI.XCPAPIDispenser[]>} The list of dispensers.
     */
    getDispensers: async ({ asset }: { asset: string }): Promise<XCPAPI.XCPAPIDispenser[]> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispensers`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "10000")
        endpoint.searchParams.set("status", "open")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIDispenser[] }
        return data.result;
    },
    /**
     * Retrieves the balance for a specific address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.address - The address to query.
     * @returns {Promise<XCPAPI.Balance[]>} The balance information.
     */
    getBalance: async ({ address }: { address: string }): Promise<XCPAPI.Balance[]> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances`)
        endpoint.searchParams.set("verbose", "true")
        const data = await fetch(endpoint)
        const balances = await data.json() as { result: XCPAPI.XCPAPIBalance[] }
        return balanceAdapter(balances.result)
    },
    /**
     * Retrieves the token balance for a specific asset and address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The address to query.
     * @returns {Promise<XCPAPI.Balance[]>} The token balance information.
     */
    getTokenBalance: async ({ asset, address }: { asset: string, address: string }): Promise<XCPAPI.Balance[]> => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances/${asset}`);
        endpoint.searchParams.set("verbose", "true")
        const data = await fetch(endpoint)
        const balances = await data.json() as { result: XCPAPI.XCPAPIBalance[] }
        return balanceAdapter(balances.result)
    },
    /**
     * Sends an asset to a destination address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The source address.
     * @param {string} params.destination - The destination address.
     * @param {number} params.amount - The amount to send.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
    sendAsset: async ({ asset, address, destination, amount }: { asset: string, address: string, destination: string, amount: number }) => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/send`)
        endpoint.searchParams.set("asset", asset);
        endpoint.searchParams.set("use_enhanced_send", "true");
        endpoint.searchParams.set("address", address);
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("destination", destination);
        endpoint.searchParams.set("quantity", amount.toString());
        const response = await fetch(endpoint);
        const data = await response.json() as XCPAPI.XCPAPICompose<XCPAPI.XCPAPISendAsset>;
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        }
    },
    /**
     * Sends an asset from a UTXO to a destination address.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.utxo - The UTXO identifier.
     * @param {string} params.destination - The destination address.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
    sendAssetInUTXO: async ({ utxo, destination }: { utxo: string, destination: string }) => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/utxos/${utxo}/compose/movetoutxo`)
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("destination", destination);
        const response = await fetch(endpoint);
        const data = await response.json() as XCPAPI.XCPAPICompose<XCPAPI.XCPAPISendAsset>;
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        }
    },
    /**
     * Attaches an asset to a UTXO.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.asset - The asset identifier.
     * @param {string} params.address - The address to attach the asset to.
     * @param {number} params.amount - The amount to attach.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
    attachToUTXO: async ({ asset, address, amount }: { asset: string, address: string, amount: number }) => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/attach`)
        endpoint.searchParams.set("asset", asset);
        endpoint.searchParams.set("address", address);
        endpoint.searchParams.set("verbose", "True");
        endpoint.searchParams.set("quantity", amount.toString());
        endpoint.searchParams.set("utxo_value", "546");
        const response = await fetch(endpoint);
        const data = await response.json() as XCPAPI.XCPAPICompose<XCPAPI.XCPAPIAttachToUTXO>;
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        }
    },
    /**
     * Detaches an asset from a UTXO.
     * @param {Object} params - The parameters for the request.
     * @param {string} params.utxo - The UTXO identifier.
     * @param {string} params.destination - The destination address.
     * @returns {Promise<Object>} The transaction details including PSBT and inputs to sign.
     */
    detachFromUTXO: async ({ utxo, destination }: { utxo: string, destination: string }) => {
        const endpoint = new URL(`${getConfig().COUNTERPARTY.ENDPOINT}/v2/utxos/${utxo}/compose/detach`)
        endpoint.searchParams.set("destination", destination);
        endpoint.searchParams.set("verbose", "True");
        const response = await fetch(endpoint);
        const data = await response.json() as XCPAPI.XCPAPICompose<XCPAPI.XCPAPISendAsset>;
        const { psbt, inputsToSign } = await composeAdapter(data.result.rawtransaction);
        return {
            ...data.result,
            psbt: psbt,
            inputsToSign
        }
    }
}