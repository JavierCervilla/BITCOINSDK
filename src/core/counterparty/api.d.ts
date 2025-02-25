export interface XCPAPIBalance {
    address: string | null
    asset: string,
    quantity: number
    utxo: string | null
    utxo_address: string | null
    asset_info?: {
        asset_longname: string | null
        description: string | null
        issuer: string | null
        divisible: boolean
        locked: boolean
    },
    quantity_normalized?: string
}

export interface Balance {
    asset: string
    qty: number
    qty_normalized: string
    description: string | null
    name: string
    divisible: boolean
    locked: boolean
    utxo: string | null
    address: string | null
    utxo_address: string | null
}

export interface XCPAPIAsset {
    asset: string
    asset_id: string
    asset_longname: string | null
    issuer: string | null
    owner: string | null
    divisible: boolean
    locked: boolean
    supply: number
    description: string | null
    description_locked: boolean
    first_issuance_block_index: number
    last_issuance_block_index: number
    confirmed: boolean
    first_issuance_block_time: number
    last_issuance_block_time: number
    supply_normalized: string
}

export interface AssetInfo {
    asset_longname: string | null
    description: string
    issuer: string | null
    divisible: boolean
    locked: boolean
}

export interface XCPAPIDispense {
    asset: string
    asset_info: AssetInfo
    block_index: number
    block_time: number
    btc_amount: number
    btc_amount_normalized: string
    destination: string
    dispense_index: number
    dispense_quantity: number
    dispense_quantity_normalized: string
    dispenser: XCPAPIDispenser
    dispenser_tx_hash: string
    source: string
    tx_hash: string
    tx_index: number
}

export type DispenserStatus = "open" | "closed" | "closing" | "open_empty_address"

export interface XCPAPIDispenser {
    tx_index: number
    tx_hash: string
    block_index: number
    source: string
    asset: string
    give_quantity: number
    escrow_quantity: number
    satoshirate: number
    status: DispenserStatus
    give_remaining: number
    oracle_address: string | null
    last_status_tx_hash: string | null
    origin: string
    dispense_count: number
    last_status_tx_source: string | null
    close_block_index: number | null
    price: number
    fiat_price: number | null
    oracle_price: number | null
    fiat_unit: number | null
    oracle_price_last_updated: number | null
    satoshi_price: number
    block_time: number
    asset_info?: AssetInfo
    give_quantity_normalized: string
    give_remaining_normalized: string
    escrow_quantity_normalized: string
    satoshirate_normalized: string
    satoshi_price_normalized: string
    price_normalized: string
}

export interface XCPAPICompose<T> {
    result: T
}

export interface XCPAPISendAsset {
    rawtransaction: string
    btc_in: number
    btc_out: number
    btc_change: number
    btc_fee: number
    data: string
    lock_scripts: string[]
    inputs_values: number[]
    signed_tx_estimated_size: EstimatedSize
    psbt: string
    params: SendAssetParams
    name: string
}

export interface SendAssetParams {
    source: string
    destination: string
    asset: string
    quantity: number
    memo: string | null
    memo_is_hex: boolean
    use_enhanced_send: boolean
    no_dispense: boolean
    skip_validation: boolean
    asset_info: AssetInfo
    quantity_normalized: string
}

export interface EstimatedSize {
    vsize: number
    adjusted_vsize: number
    sigops_count: number
}

export interface XCPAPIAttachToUTXO {
    rawtransaction: string
    btc_in: number
    btc_out: number
    btc_change: number
    btc_fee: number
    data: string
    lock_scripts: string[]
    inputs_values: number[]
    signed_tx_estimated_size: EstimatedSize
    psbt: string
    params: AttachToUTXOParams
    name: string
} 

interface AttachToUTXOParams {
    asset: string
    asset_info: AssetInfo
    destination_vout: number|null
    quantity: number
    quantity_normalized: string
    skip_validation: boolean
    source: string
    utxo_value: number | null
}

export interface XCPAPIDetachFromUTXO {
    rawtransaction: string
    btc_in: number
    btc_out: number
    btc_change: number
    btc_fee: number
    data: string
    lock_scripts: string[]
    inputs_values: number[]
    signed_tx_estimated_size: EstimatedSize
    psbt: string
    params: DetachFromUTXOParams
    name: string
} 

interface DetachFromUTXOParams {
    asset: string
    asset_info: AssetInfo
    destination: string|null
    quantity: number
    quantity_normalized: string
    skip_validation: boolean
    source: string
    utxo_value: number | null
}

interface InputToSign {
	index: number;
	address: string;
	sighashTypes: number[];
}