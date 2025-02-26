import React from "react";
import { walletConfig } from "../../index.js"

import ConnectWalletButton from "./ConnectWallet.component.js"

export function ConnectWalletAction() {
  return (
    <ConnectWalletButton
      className="text-primary cursor-pointer flex text-xs font-medium items-center gap-2 border border-primary rounded-lg px-2 py-0.5"
      wallets={walletConfig}
    />
  )
}

