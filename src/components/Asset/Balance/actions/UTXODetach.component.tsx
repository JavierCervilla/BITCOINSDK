import { useState } from "react";
import { useModal } from "@/context/modalContext.tsx";
import { useWallet } from "@/index.ts";
import bitcoinsdk from "@/lib/index.ts";
import * as bitcoin from "bitcoinjs-lib";
import { Loader } from "@/components/Loader/Loader.component.tsx";
import { showToast } from "@/components/Toast/Toast.component.tsx";
import { Unlink } from "lucide-react"


import type * as XCPAPI from "@/lib/counterparty/api.d.ts";
import { short_address } from "@/lib/utils/index.ts";

interface SendActionProps {
  balance: XCPAPI.Balance;
}

export function UTXODetachAction({ balance }: Readonly<SendActionProps>) {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();
  const { walletAddress, signPSBT } = useWallet();

  async function sendTransaction() {
    const params = {
      utxo: balance.utxo as string,
      destination: walletAddress as string,
    };
    const { psbt, inputsToSign } = await bitcoinsdk.counterparty.detachFromUTXO(params)
    const signedPsbt = await signPSBT(psbt, {
      inputsToSign,
      autoFinalized: false,
      broadcast: true,
    });
    if (!signedPsbt) throw new Error("Failed to sign PSBT");
    const tx = bitcoin.Psbt.fromHex(signedPsbt);
    const txHex = tx.finalizeAllInputs().extractTransaction().toHex();
    const { result: txid } = await bitcoinsdk.bitcoin.sendRawTransaction({ txHex });
    if (!txid) throw new Error("Failed to send transaction");
    return txid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const txid = await sendTransaction();
      showToast({
        content: (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-primary">Transaction sent</p>
            <a href={`https://horizon.market/explorer/tx/${txid}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">View on Horizon Explorer</a>
            <a href={`https://mempool.space/tx/${txid}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">View on Mempool Space</a>
          </div>
        ),
        type: "success"
      });
    } catch (error) {
      showToast(
        {
          content: (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-primary">{error.message}</p>
            </div>
          ),
          type: "error"
        }
      );
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-light/5 border border-primary/20 rounded-lg p-6 shadow-lg max-w-md mx-auto"
    >
      <div className="space-y-6">
        <div className="text-center">
          <Unlink className="w-12 h-12 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-primary">Detach from UTXO</h1>
        </div>

        <div className="bg-light/10 rounded-md p-4">
          <p className="text-sm text-secondary mb-1">UTXO</p>
          <p className="text-lg font-medium text-primary">{short_address(balance.utxo)}</p>
        </div>

        <div className="bg-light/10 rounded-md p-4">
          <p className="text-sm text-secondary mb-1">Amount</p>
          <p className="text-lg font-medium text-primary">
            {Number(balance.qty_normalized)} {balance.asset}
          </p>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Detach from UTXO
        </button>

        <p className="text-xs text-center text-secondary mt-4">
          This action will detach the asset from the specified UTXO and return it to your wallet.
        </p>
      </div>
    </form>
  );
}