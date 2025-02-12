export interface MarketData {
    id: string
    name: string
    symbol: string
    current_price: number
    price_change_percentage_24h: number
    total_volume: number
    market_cap: number
    icon?: string
}

export interface XCPAssetBalance {
    address: string | null
    asset: string
    name: string
    description: string | null
    divisible: boolean
    locked: boolean
    qty: number
    qty_normalized: string
    utxo: string | null
    utxo_address: string | null
}