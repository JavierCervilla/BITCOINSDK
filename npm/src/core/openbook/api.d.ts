export interface InputsToSign {
    index: number
    sighashTypes: number[]
    address: string
}

export interface ServiceFee {
    address: string
    fee: string
}

export interface UtxoBalance {
    assetId: string
    qty: number
    protocol: number
    protocol_name: string
}

export interface OpenbookAtomicSwap {
    tx_index: number
    txid: string
    timestamp: string
    block_hash: string
    block_index: number
    seller: string
    buyer: string
    utxo: string
    utxo_balance: UtxoBalance[]
    total_price: number
    unit_price: number
    service_fees: ServiceFee[]
}

export interface OpenbookAtomicSwapOrder {
    txid: string
    timestamp: string
    price: number
    psbt: string
    status: string
    seller: string
    utxo: string
    block_index: number
    utxo_balance: UtxoBalance[]
}

export interface PaginatedResponse<T> {
    page: number
    limit: number
    total: number
    totalPages: number
    result: T[]
}

export interface OpenbookCancelOrder {
    psbt: string
    inputsToSign: InputsToSign[]
    fee: string
    btc_in: string
    btc_out: string
    btc_change: string
    expectedFee: number
    vSize: number
    baseSize: number
}

export interface OpenbookPsbtForListOrder {
    price: number
    psbt: string
    seller: string
    utxo: string
    inputsToSign: InputsToSign[]
}

export interface OpenbookPsbtForBuyOrder {
    psbt: string,
    inputsToSign: InputsToSign[],
    fee: bigint,
    btc_in: bigint,
    btc_out: bigint,

    expectedFee: number,
    baseSize: number,
    vSize: number,
}

export interface OpenbookMempoolFees {
    fastestFee: number
    halfHourFee: number
    hourFee: number
    minimumFee: number
}

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