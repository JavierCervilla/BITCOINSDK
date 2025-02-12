import { useState } from "react";
import { ViewModal } from "./ViewModal.component.tsx"
import "@/styles/tailwind.css"
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector.component.tsx";
import { WalletProvider, walletConfig } from "@/index.ts";
import { MemoryRouter } from 'react-router-dom';

export const ViewModalStorie = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-light">
      <ThemeSelector />
      <MemoryRouter>
        <WalletProvider theme="elegant-dark" wallets={walletConfig}>
          <button className="bg-primary cursor-pointer text-light p-2 rounded-md max-w-fit mx-auto" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
          <ViewModal isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
            <div className="text-secondary text-center">
              <h1>ViewModal</h1>
            </div>
          </ViewModal>
        </WalletProvider>
      </MemoryRouter>
    </div>
  )
}