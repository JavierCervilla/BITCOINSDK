import React from "react";
import { Settings as SettingsIcon, Palette } from "lucide-react"

import { useWallet } from "../../../../ui/context/walletContext.tsx"
import { ThemeSelector } from "../../../../ui/components/ThemeSelector/ThemeSelector.component.tsx"

export function SettingsView() {
  const { connected } = useWallet()

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-2 text-primary">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <section>
          <div className="flex items-center gap-2 text-primary mb-6">
            <Palette className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Theme Settings</h2>
          </div>

          <ThemeSelector variant="full" />
        </section>

        {!connected && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-secondary text-center">
              Connect your wallet to access additional settings
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 