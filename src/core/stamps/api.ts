import { getConfig } from '../config.ts'

export const stamps = {
    getStamps: async () => {
        const endpoint = new URL(`${getConfig().STAMPS.ENDPOINT}/api/v2/stamps`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    },
    getSRC20Balance: async ({ address, limit = 50, page = 1, amt = 0 }: { address: string, limit: number, page: number, amt: number }) => {
        const endpoint = new URL(`${getConfig().STAMPS.ENDPOINT}/api/v2/src20/balance/${address}`)
        endpoint.searchParams.set("limit", limit.toString())
        endpoint.searchParams.set("page", page.toString())
        endpoint.searchParams.set("amt", amt.toString())
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    },
    getStampsBalance: async ({ address, limit = 50, page = 1 }: { address: string, limit: number, page: number}) => {
        const endpoint = new URL(`${getConfig().STAMPS.ENDPOINT}/api/v2/stamps/balance/${address}`)
        endpoint.searchParams.set("limit", limit.toString())
        endpoint.searchParams.set("page", page.toString())
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    }
}