import { Routes, Route, MemoryRouter } from 'react-router-dom'

import { WalletProvider } from '@/ui/context/walletContext.tsx'
import { walletConfig } from '@/ui/index.ts'
import { Layout } from '@/ui/components/Layout/Layout.component.tsx'
import { MarketView } from '@/ui/components/Views/Market/Market.component.tsx'
import { WalletView } from '@/ui/components/Views/Wallet/Wallet.component.tsx'
import { SettingsView } from '@/ui/components/Views/Settings/Settings.component.tsx'
import { AssetView } from "@/ui/components/Views/Asset/AssetView.component.tsx";
import { ToastProvider } from '@/ui/components/Toast/ToastProvider.component.tsx'

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