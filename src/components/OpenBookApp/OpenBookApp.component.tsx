import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { WalletProvider } from '@/context/walletContext.tsx'
import { walletConfig } from '@/index.ts'
import { Layout } from '@/components/Layout/Layout.component.tsx'
import { MarketView } from '@/components/Views/Market/Market.component.tsx'
import { WalletView } from '@/components/Views/Wallet/Wallet.component.tsx'
import { SettingsView } from '@/components/Views/Settings/Settings.component.tsx'
import { AssetView } from "@/components/Views/Asset/AssetView.component.tsx";
import { ToastProvider } from '@/components/Toast/ToastProvider.component.tsx'

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