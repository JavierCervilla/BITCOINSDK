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

export interface PaginatedResponse<T> {
    page: number
    limit: number
    total: number
    totalPages: number
    result: T[]
}