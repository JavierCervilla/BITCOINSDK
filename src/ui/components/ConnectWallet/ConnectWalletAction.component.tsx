import React from "react";
import { walletConfig } from "../../../ui/index.ts"

import ConnectWalletButton from "../../../ui/components/ConnectWallet/ConnectWallet.component.tsx"

export function ConnectWalletAction() {
  return (
    <ConnectWalletButton
      buttonClassName="text-primary cursor-pointer flex text-xs font-medium items-center gap-2 border border-primary rounded-lg px-2 py-0.5"
      dropdownClassName="border border-primary bg-light text-black border border-primary"
      dropdownItemClassName="text-black"
      wallets={walletConfig}
    />
  )
}

