import React from "react";
import { Routes, Route, MemoryRouter } from 'react-router-dom'

import { WalletProvider } from '../../context/walletContext.js'
import { walletConfig } from '../../index.js'
import { Layout } from '../Layout/Layout.component.js'
import { MarketView } from '../Views/Market/Market.component.js'
import { WalletView } from '../Views/Wallet/Wallet.component.js'
import { SettingsView } from '../Views/Settings/Settings.component.js'
import { AssetView } from "../Views/Asset/AssetView.component.js";
import { ToastProvider } from '../Toast/ToastProvider.component.js'

interface OpenBookAppProps {
  isOpen: boolean
  onClose: () => void
  theme?: string
}

export function OpenBookApp({ isOpen, onClose, theme = 'bitcoin-dark' }: OpenBookAppProps) {
  return (
    <MemoryRouter>
      <ToastProvider>
        <WalletProvider theme={theme} wallets={walletConfig}>
          <Routes>
            <Route element={<Layout isOpen={isOpen} onClose={onClose} />}>
              <Route path="/" element={<MarketView />} />
              <Route path="/market" element={<MarketView />} />
              <Route path="/wallet" element={<WalletView />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route path="/asset/:assetid" element={<AssetView />} />
            </Route>
          </Routes>
        </WalletProvider>
      </ToastProvider>
    </MemoryRouter>
  )
} 