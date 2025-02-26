import React from "react";
import { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";

import { bitcoinsdk } from "../../../core/index.ts";

import type * as XCPAPI from "../../../core/counterparty/api.d.ts";

export function AssetInfo({ asset }: Readonly<{ asset: XCPAPI.XCPAPIAsset }>) {
  const [holders, setHolders] = useState(0)

  useEffect(() => {
    bitcoinsdk.counterparty.getHoldersCount({ asset: asset?.asset }).then((data) => {
      setHolders(data)
    })
  }, [asset])

  return (
    <div className="flex flex-col">
      <div id="description" className="border-primary border-b p-2">
        <div className="text-primary flex items-center gap-2 font-bold text-md">
          <h4>
            Description
          </h4>
          {
            asset?.description_locked || asset?.locked ?
              <Lock className="w-4 h-4" />
              :
              <Unlock className="w-4 h-4" />
          }
        </div>
        <p className="text-sm text-secondary truncate">
          {asset?.description}
        </p>
      </div>
      <div id="general-info" className="flex gap-2 justify-between p-2">
        <div id="supply" className="text-primary flex flex-col font-bold text-md ">
          <h4 className="text-secondary">Supply</h4>
          <p className="text-xs text-primary truncate">{Number(asset?.supply_normalized).toLocaleString()}</p>
        </div>
        <div id="supply" className="flex items-center justify-between rounded-lg p-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold text-sm">{asset?.locked ? "Locked" : "Unlocked"}</span>
            {asset?.locked ? <Lock className="w-4 h-4 text-primary" /> : <Unlock className="w-4 h-4 text-primary" />}
          </div>
        </div>
        <div id="holders" className="text-primary flex flex-col font-bold text-md ">
          <h4 className="text-secondary">Holders</h4>
          <p className="text-xs text-primary truncate">{holders}</p>
        </div>
      </div>
    </div>
  )
}