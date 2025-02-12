import { CONFIG } from "@/lib/config.ts";

export const stamps = {
    getStamps: async () => {
        const endpoint = new URL(`${CONFIG.STAMPS.ENDPOINT}/api/v2/stamps/FAIRBTC`)
        const data = await fetch(endpoint)
        const json = await data.json()
        return json
    }
}