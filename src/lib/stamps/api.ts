import { bitcoinsdk } from "@/lib/index.ts"

export const stamps = {
    getStamps: async () => {
        const endpoint = new URL(`${bitcoinsdk.CONFIG().STAMPS.ENDPOINT}/api/v2/stamps`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    }
}