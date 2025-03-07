import React from "react";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";

import bitcoinsdk from "../../../../../core/index.js";

import { useWallet } from "../../../../index.js";
import { Loader } from "../../../Loader/Loader.component.js";
import { showToast } from "../../../Toast/Toast.component.js";

import type * as OpenbookAPI from "../../../../../core/openbook/api";


interface CancelOrderActionProps {
  order: OpenbookAPI.OpenbookAtomicSwapOrder;
}

export function CancelOrderAction({ order }: Readonly<CancelOrderActionProps>) {
  const [loading, setLoading] = useState(false);
  const { signPSBT } = useWallet();

  async function sendTransaction() {
    const feeRate = await bitcoinsdk.openbook.utils.getMempoolFees()
    const params = {
      id: order.txid,
      feeRate: feeRate?.fastestFee || 2
    };
    const { psbt, inputsToSign } = await bitcoinsdk.openbook.cancelAtomicSwap(params)
    console.log(psbt, inputsToSign)
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

  const handleCancel = async (e: React.FormEvent) => {
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
    }
  };

  if (loading) return <Loader size={26} />;

  return (
    <button
      className="w-full ml-10 sm:ml-2 cursor-pointer text-sm text-primary rounded-lg p-2 bg-warning border border-primary hover:bg-primary hover:text-light transition-colors font-mono truncate"
      type="button"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}