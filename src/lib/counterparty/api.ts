import { CONFIG } from "@/lib/config.ts";
import type * as XCPAPI from "./api.d.ts";
import * as hex from "@/lib/utils/hex.ts";
import { bitcoin as rpc } from "@/lib/bitcoin/api.ts";
import * as bitcoin from "bitcoinjs-lib"
import type { InputToSign } from "@/context/walletContext.tsx";


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

async function composeAdapter(rawTransaction: string) {
    try {
        const psbt = new bitcoin.Psbt()
        const tx = bitcoin.Transaction.fromHex(rawTransaction)

        const inputsToSign: InputToSign[] = []
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


export const counterparty = {
    getAsset: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/assets/${asset}`)
        endpoint.searchParams.set("verbose", "true")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIAsset }
        return data.result;
    },
    getHoldersCount: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/holders`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "0")
        const response = await fetch(endpoint)
        const data = await response.json() as { result_count: number }
        return data.result_count as number;
    },
    getDispenses: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispenses`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "10000")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIDispense[] }
        return data.result;
    },
    getDispensers: async ({ asset }: { asset: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/assets/${asset}/dispensers`)
        endpoint.searchParams.set("verbose", "true")
        endpoint.searchParams.set("limit", "10000")
        endpoint.searchParams.set("status", "open")
        const response = await fetch(endpoint)
        const data = await response.json() as { result: XCPAPI.XCPAPIDispenser[] }
        return data.result;
    },
    getBalance: async ({ address }: { address: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances`)
        endpoint.searchParams.set("verbose", "true")
        const data = await fetch(endpoint)
        const balances = await data.json() as { result: XCPAPI.XCPAPIBalance[] }
        return balanceAdapter(balances.result)
    },
    getTokenBalance: async ({ asset, address }: { asset: string, address: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/balances/${asset}`);
        endpoint.searchParams.set("verbose", "true")
        const data = await fetch(endpoint)
        const balances = await data.json() as { result: XCPAPI.XCPAPIBalance[] }
        return balanceAdapter(balances.result)
    },
    sendAsset: async ({ asset, address, destination, amount }: { asset: string, address: string, destination: string, amount: number }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/send`)
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
    attachToUTXO: async ({ asset, address, amount }: { asset: string, address: string, amount: number }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/attach`)
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
    detachFromUTXO: async ({ utxo, destination }: { asset: string, destination: string }) => {
        const endpoint = new URL(`${CONFIG.COUNTERPARTY.ENDPOINT}/v2/addresses/${address}/compose/attach`)
        endpoint.searchParams.set("destination", destination);
        endpoint.searchParams.set("utxo", utxo);
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