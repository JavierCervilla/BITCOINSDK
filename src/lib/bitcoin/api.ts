import {getConfig} from '@/lib/config.ts'

async function callRPC(method: string, params: unknown[]) {
    try{
        const rpcCall = {
            jsonrpc: "2.0",
            id: 1,
            method: method,
            params: params
        }
        const auth = btoa(`${getConfig().BITCOIN.RPC_USER}:${getConfig().BITCOIN.RPC_PASSWORD}`)
        const response = await fetch(getConfig().BITCOIN.ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
            body: JSON.stringify(rpcCall)
        })
        const data = await response.json()
        return data
    } catch(e){
        console.error(e)
    }
}



export const bitcoin = {
    getBalance: async ({ address }: { address: string }) => {
        const data = await callRPC("scantxoutset", ["start", address])
        return data
    },
    getRawTransaction: async ({ txid, verbose }: { txid: string, verbose: boolean }) => {
        const data = await callRPC("getrawtransaction", [txid, verbose])
        return data
    },
    getMempoolFee: async () => {
        const endpoint = new URL('https://mempool.space/api/v1/fees/recommended')
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    },
    sendRawTransaction: async ({ txHex }: { txHex: string }) => {
        const data = await callRPC("sendrawtransaction", [txHex])
        return data
    }
}