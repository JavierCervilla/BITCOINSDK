import { CONFIG } from "@/lib/config.ts";

export async function callRPC(method: string, params: unknown[]) {
    try{
        const rpcCall = {
            jsonrpc: "2.0",
            id: 1,
            method: method,
            params: params
        }
        const auth = btoa(`${CONFIG.ELECTRUM.RPC_USER}:${CONFIG.ELECTRUM.RPC_PASSWORD}`)
        const response = await fetch(CONFIG.ELECTRUM.ENDPOINT, {
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
