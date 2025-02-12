import { useState, useEffect } from "react"
import type * as XCPAPI from "@/lib/counterparty/api.d.ts"
import { bitcoinsdk } from "@/lib/index.ts"
import { useWallet } from "@/index.ts"
import { Link, Unlink, Wallet, Send, BadgeDollarSign } from "lucide-react"
import { short_address } from "@/lib/utils/index.ts"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import { BalanceControl } from "@/components/Asset/Balance/actions/BalanceControl.component.tsx"
import { AccountSendAction } from "@/components/Asset/Balance/actions/AccountSend.component.tsx"
import { UTXOSendAction } from "@/components/Asset/Balance/actions/UtxoSend.component.tsx"
import { UTXOAttachAction } from "@/components/Asset/Balance/actions/UTXOAttach.component.tsx"
import { UTXODetachAction } from "@/components/Asset/Balance/actions/UTXODetach.component.tsx"
import { ModalProvider } from "@/context/modalContext.tsx"
import { Modal } from "@/components/Modal/Modal.component.tsx"

function AccountBalanceControls({ balance }: { balance: XCPAPI.Balance }) {
  const { walletAddress } = useWallet()
  if (!walletAddress) return null

  return (
    <div className="flex items-center gap-2">
      <BalanceControl icon={Send} label="Send" action={<AccountSendAction balance={balance} />} />
      <BalanceControl icon={Link} label="Attach to UTXO" action={<UTXOAttachAction balance={balance} />} />
    </div>
  )
}

function UtxoBalanceControls({ balance }: { balance: XCPAPI.Balance }) {
  const { walletAddress } = useWallet()
  if (!walletAddress) return null

  return (
    <div className="flex items-center gap-2">
      <BalanceControl icon={Send} label="Send" action={ <UTXOSendAction balance={balance} />} />
      <BalanceControl icon={Unlink} label="Detach from UTXO" action={ <UTXODetachAction balance={balance} />} />
      <BalanceControl icon={BadgeDollarSign} label="Sell Item" action={ <div>Sell Item Action</div>} />
    </div>
  )
}

function BalanceItem({ balance }: { balance: XCPAPI.Balance }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 border border-secondary rounded-lg w-full justify-between bg-light/5 hover:bg-light/10 transition-colors">
      <div className="flex items-center gap-2 min-w-[33%]">
        {balance.utxo ? <Link className="w-4 h-4 text-primary" /> : <Unlink className="w-4 h-4 text-primary" />}
        <div className="flex flex-col sm:flex-row text-sm items-start sm:items-center gap-1 sm:gap-2">
          <span className="font-medium">{Number(balance.qty_normalized).toFixed(2)}</span>
          <span className="text-primary text-xs">
            {balance.utxo ? short_address(balance.utxo) : short_address(balance.address as string)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {balance.utxo ? <UtxoBalanceControls balance={balance} /> : <AccountBalanceControls balance={balance} />}
      </div>
    </div>
  )
}

function BalanceSectionContent({ asset }: { asset: string }) {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState<XCPAPI.Balance[] | null>(null)
  const { walletAddress } = useWallet()

  useEffect(() => {
    if (!walletAddress) return
    setLoading(true)
    bitcoinsdk.counterparty
      .getTokenBalance({ asset: asset as string, address: walletAddress as string })
      .then((bal) => {
        console.log(bal)
        setBalance(bal)
        setLoading(false)
      })
  }, [asset, walletAddress])

  if (loading) {
    return <Loader />
  }

  if (balance?.length === 0) {
    return <div className="text-center py-4 text-secondary">No balance available</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg flex items-center gap-2 text-primary">
        <Wallet className="w-5 h-5" />
        Your balance
      </h2>
      <div className="flex flex-col gap-3 p-1">
        {balance?.map((bal: XCPAPI.Balance, index: number) => (
          <BalanceItem key={`${bal.asset}-${index}`} balance={bal} />
        ))}
      </div>
    </div>
  )
}

export function BalanceSection({ asset }: { asset: string }) {
  return (
    <ModalProvider>
      <BalanceSectionContent asset={asset} />
      <Modal />
    </ModalProvider>
  )
}

