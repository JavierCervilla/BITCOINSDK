import React from "react";
import { Wallet, LogOut } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import {cn} from "../../../ui/utils/style.ts"
import { useWallet } from "../../../ui/context/walletContext.tsx"
import { walletConfig } from "../../../ui/index.ts";

interface ConnectWalletButtonProps {
  readonly className?: string
  readonly wallets: Readonly<{ [key: string]: { label: string; icon: string } }>
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export function ConnectWalletButton({
  className,
  wallets=walletConfig,
}: Readonly<ConnectWalletButtonProps>) {
  const { walletAddress, connected, connectWallet, disconnectWallet } = useWallet()

  return (
    <div className="z-50">
      {!connected ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button type="button" className={cn("cursor-pointer py-2.5 min-w-fit px-4 border border-primary text-nowrap text-primary hover:scale-105 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300", className)}>
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-50 min-w-[12rem] overflow-hidden rounded-xl border border-primary bg-light p-1 shadow-md bg-black"
              sideOffset={5}
            >
              {Object.entries(wallets).map(([key, { label, icon }], index) => (
                <DropdownMenu.Item
                  key={key}
                  onClick={async () => await connectWallet(key)}
                  className={`flex items-center px-4 py-3 text-sm font-medium cursor-pointer hover:bg-primary hover:border-none hover:text-light text-primary transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    index < Object.entries(wallets).length - 1 ? "border-b border-primary" : ""
                  }`}
                >
                  <img src={icon || "/placeholder.svg"} alt={label} className="w-6 h-6 mr-3" />
                  <span>{label}</span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <div className="flex items-center gap-3 z-10">
          <div className="px-6 py-3 text-sm font-medium border rounded-lg bg-light text-dark border-primary">
            {shortenAddress(walletAddress as string)}
          </div>
          <button
            type="button"
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl shadow-md bg-primary text-primary cursor-pointer hover:bg-hover transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <LogOut className="w-5 h-5 text-dark" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ConnectWalletButton
