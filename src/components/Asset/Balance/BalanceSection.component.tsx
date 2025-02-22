import { useState, useEffect, useCallback } from "react"
import type * as XCPAPI from "@/lib/counterparty/api.d.ts"
import type * as OpenbookAPI from "@/lib/openbook/api.d.ts";
import { bitcoinsdk } from "@/lib/index.ts"
import { useWallet } from "@/index.ts"
import { Link, Unlink, Wallet, Send, BadgeDollarSign } from "lucide-react"
import { short_address } from "@/lib/utils/index.ts"
import { Loader } from "@/components/Loader/Loader.component.tsx"
import { BalanceControl } from "@/components/Asset/Balance/actions/BalanceControl.component.tsx"
import { AccountSendAction } from "@/components/Asset/Balance/actions/AccountSend.component.tsx"
import { UTXOSendAction } from "@/components/Asset/Balance/actions/UTXOSend.component.tsx"
import { UTXOAttachAction } from "@/components/Asset/Balance/actions/UTXOAttach.component.tsx"
import { UTXODetachAction } from "@/components/Asset/Balance/actions/UTXODetach.component.tsx"
import { ModalProvider } from "@/context/modalContext.tsx"
import { Modal } from "@/components/Modal/Modal.component.tsx"
import { ListUTXOAction } from "@/components/Asset/Balance/actions/UtxoList.component.tsx";

function AccountBalanceControls({ balance, btcPrice: _btcPrice }: Readonly<{ balance: XCPAPI.Balance, btcPrice: number }>) {
  const { walletAddress } = useWallet()
  if (!walletAddress) return null

  return (
    <div className="flex items-center gap-2">
      <BalanceControl icon={Send} label="Send" action={<AccountSendAction balance={balance} />} />
      <BalanceControl icon={Link} label="Attach to UTXO" action={<UTXOAttachAction balance={balance} />} />
    </div>
  )
}

function UtxoBalanceControls({ balance, btcPrice, orders }: Readonly<{ balance: XCPAPI.Balance, btcPrice: number, orders: OpenbookAPI.OpenbookAtomicSwapOrder[] }>) {
  const { walletAddress } = useWallet()
  if (!walletAddress) return null

  return (
    <div className="flex items-center gap-2">
      <BalanceControl icon={Send} label="Send" action={<UTXOSendAction balance={balance} />} />
      <BalanceControl icon={Unlink} label="Detach from UTXO" action={<UTXODetachAction balance={balance} />} />
      {
        orders.length > 0 && orders.find(order => order.utxo === balance.utxo) ?
          null
          : (
            <BalanceControl icon={BadgeDollarSign} label="Sell Item" action={<ListUTXOAction balance={balance} btcPrice={btcPrice} />} />
          )
      }
    </div>
  )
}

function BalanceItem({ balance, btcPrice, orders }: Readonly<{ balance: XCPAPI.Balance; btcPrice: number, orders: OpenbookAPI.OpenbookAtomicSwapOrder[] }>) {
  return (
    <div className="flex flex-col items-start sm:items-center border border-secondary rounded-lg w-full justify-between bg-light transition-colors">
      <h4 className="text-left w-full flex gap-2 text-xs text-primary font-medium px-2 py-1 border-b border-secondary">
        {balance.utxo ? <Link className="w-4 h-4 text-primary" /> : <Unlink className="w-4 h-4 text-primary" />}
        {balance.utxo ? "UTXO balance" : "Account balance"}
      </h4>
      <div className="flex flex-row gap-4 items-center sm:items-center px-3 justify-between  transition-colors w-full">
        <div className="flex items-center gap-2 min-w-2/4">
          <div className="flex flex-row text-sm items-center gap-3 sm:gap-6 w-full justify-between">
            <span className="font-medium">{Number(balance.qty_normalized).toFixed(2)}</span>
            <span className="text-primary text-xs">
              {balance.utxo ? short_address(balance.utxo) : short_address(balance.address as string)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {balance.utxo ? <UtxoBalanceControls balance={balance} btcPrice={btcPrice} orders={orders} /> : <AccountBalanceControls btcPrice={btcPrice} balance={balance} />}
        </div>
      </div>
    </div>
  )
}

function BalanceSectionContent({ asset, btcPrice }: Readonly<{ asset: string, btcPrice: number, orders: OpenbookAPI.OpenbookAtomicSwapOrder[] }>) {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState<XCPAPI.Balance[] | null>(null)
  const [orders, setOrders] = useState<OpenbookAPI.OpenbookAtomicSwapOrder[] | null>(null)
  const { walletAddress } = useWallet()

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [assetBalance, swapOrdersData] = await Promise.all([
        bitcoinsdk.counterparty.getTokenBalance({ asset: asset, address: walletAddress as string }),
        bitcoinsdk.openbook.getAtomicSwapOrdersByAsset({ asset }),
      ]);
      setBalance(assetBalance)
      setOrders(swapOrdersData.result.filter(order => order.status === "active"));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [asset, walletAddress]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return <Loader />
  }

  if (balance?.length === 0) {
    return <div className="text-center py-4 text-secondary">No balance available</div>
  }

  return (
    <div className="flex flex-col gap-2 sm:min-h-[calc(100vh-180px)] md:min-h-[180px] ">
      <h2 className="font-bold text-lg flex items-center gap-2 text-primary">
        <Wallet className="w-5 h-5" />
        Your balance
      </h2>
      <div className="flex flex-col gap-2 p-1 max-h-[145px] overflow-y-auto">
        {balance?.map((bal: XCPAPI.Balance, index: number) => (
          <BalanceItem key={`${bal.asset}-${index}`} balance={bal} btcPrice={btcPrice} orders={orders} />
        ))}
      </div>
    </div>
  )
}

export function BalanceSection({ asset, btcPrice }: Readonly<{ asset: string, btcPrice: number }>) {
  return (
    <ModalProvider>
      <BalanceSectionContent asset={asset} btcPrice={btcPrice} />
      <Modal />
    </ModalProvider>
  )
}

