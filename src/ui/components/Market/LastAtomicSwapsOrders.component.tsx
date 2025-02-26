import React from "react";
import { memo, useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

import bitcoinsdk from "../../../core/index.ts"

import { Media } from "../../../ui/components/Asset/Media.component.tsx"
import { Loader } from "../../../ui/components/Loader/Loader.component.tsx";

import type * as XCPAPI from "../../../core/counterparty/api.d.ts"
import type * as OpenbookAPI from "../../../core/openbook/api.d.ts"

interface LastAtomicSwapsOrdersProps {
  lastOrders: OpenbookAPI.OpenbookAtomicSwapOrder[]
  isLoading: boolean
}

interface AssetData {
  assetId: string
  asset?: XCPAPI.XCPAPIAsset
  qty: number
  unit_price: number
  total_price: number
  seller: string
  buyer: string
  txid: string
  timestamp: string
  psbt: string
  block_index: number
  status: string
}

const assetCache = new Map<string, XCPAPI.XCPAPIAsset>()

function LastAtomicSwapsOrdersComponent({ lastOrders, isLoading }: Readonly<LastAtomicSwapsOrdersProps>) {
  const [assets, setAssets] = useState<AssetData[]>([])
  const [btcPrice, setBtcPrice] = useState(0)
  const navigate = useNavigate()

  const getBtcPrice = useCallback(async () => {
    const [price] = await Promise.all([bitcoinsdk.openbook.getBTCPrice()])
    setBtcPrice(price)
  }, [])

  useEffect(() => {
    getBtcPrice()
  }, [getBtcPrice])

  useEffect(() => {
    setAssets(
      lastOrders.filter((lastOrder) => lastOrder.status === "active").flatMap((lastOrder) =>
        lastOrder.utxo_balance.map((utxo) => ({
          assetId: utxo.assetId,
          asset: assetCache.get(utxo.assetId) || undefined,
          qty: utxo.qty,
          unit_price: lastOrder.price / utxo.qty,
          total_price: lastOrder.price,
          seller: lastOrder.seller,
          txid: lastOrder.txid,
          timestamp: lastOrder.timestamp,
          psbt: lastOrder.psbt,
          block_index: lastOrder.block_index,
          status: lastOrder.status,
        })),
      ),
    )
  }, [lastOrders])

  const loadAsset = useCallback(async (assetId: string) => {
    if (assetCache.has(assetId)) {
      setAssets((prev: AssetData[]) =>
        prev.map((item: AssetData) =>
          item.asset || item.assetId !== assetId ? item : { ...item, asset: assetCache.get(assetId) },
        ),
      )
      return
    }

    try {
      const asset = await bitcoinsdk.counterparty.getAsset({ asset: assetId })
      assetCache.set(assetId, asset)
      setAssets((prev: AssetData[]) =>
        prev.map((item: AssetData) => (item.asset || item.assetId !== assetId ? item : { ...item, asset })),
      )
    } catch (error) {
      console.error("Error fetching asset:", error)
    }
  }, [])
  useEffect(() => {
    for (const asset of assets) {
      if (!asset.asset) {
        loadAsset(asset.assetId)
      }
    }
  }, [assets, loadAsset])

  function handleURLClick(assetId: string) {
    navigate(`/asset/${assetId}`)
  }

  if (isLoading) {
    return <Loader />
  }

  if (assets.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
        <ShoppingCart size={24} className="mr-2" />
        <span>Atomic Swaps Open Orders</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-border">
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Asset</th>
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Qty</th>
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Unit Price</th>
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
              <th className="py-3 px-4 text-sm font-medium text-muted-foreground" />
            </tr>
          </thead>
          <tbody>
            {assets.map((asset: AssetData) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <tr
                key={`${asset.assetId}-${asset.txid}`}
                onClick={() => handleURLClick(asset.assetId)}
                className="border-b cursor-pointer border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      {asset.asset ? (
                        <Media asset={asset.asset} showStampIcon={false} className="w-full h-full object-cover rounded border-primary" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted rounded">
                          <Loader />
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{asset.asset?.asset || asset.assetId}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{asset.qty}</td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {`${Number(asset.unit_price).toLocaleString()} sat`}
                    <div className="text-xs text-muted-foreground">
                      ${Number((asset.unit_price * 10 ** -8 * btcPrice).toFixed(2))}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {Number(asset.total_price).toLocaleString()} sat
                    <div className="text-xs text-muted-foreground">
                      ${Number((asset.total_price * 10 ** -8 * btcPrice).toFixed(2))}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {new Date(Number(asset.timestamp) * 1000).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {
                    asset.status === "active" ? <span>view</span> : <span>expired</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const LastAtomicSwapsOrders = memo(LastAtomicSwapsOrdersComponent)

