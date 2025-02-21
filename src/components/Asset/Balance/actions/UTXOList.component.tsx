import { useState } from "react";
import { useModal } from "@/context/modalContext.tsx";
import { useWallet } from "@/index.ts";
import bitcoinsdk from "@/lib/index.ts";
import * as bitcoin from "bitcoinjs-lib";
import { Loader } from "@/components/Loader/Loader.component.tsx";
import { showToast } from "@/components/Toast/Toast.component.tsx";
import { BadgeDollarSign } from 'lucide-react'

import type * as XCPAPI from "@/lib/counterparty/api.d.ts";
import { short_address } from "@/lib/utils/index.ts";

interface ListUTXOActionProps {
  balance: XCPAPI.Balance;
  btcPrice: number;
}

export function ListUTXOAction({ balance, btcPrice }: Readonly<ListUTXOActionProps>) {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();
  const { walletAddress, signPSBT } = useWallet();

  function validateListOrderParams() {
    if (!balance.utxo) throw new Error("UTXO is required");
    if (!walletAddress) throw new Error("Seller is required");
    if (!price) throw new Error("Price is required");
    if (Number(price) <= 0 || Number.isNaN(Number(price))) throw new Error("Price must be greater than 0");
  }

  async function sendTransaction() {
    validateListOrderParams();
    const paramsForListingPsbt = {
      utxo: balance.utxo as string,
      seller: walletAddress as string,
      price: Number(price),
    };
    const { psbt, inputsToSign } = await bitcoinsdk.openbook.getPsbtForListOrder(paramsForListingPsbt)
    console.log({ psbt, inputsToSign })
    const signedPsbt = await signPSBT(psbt, {
      inputsToSign,
      autoFinalized: false,
      broadcast: false,
    });
    if (!signedPsbt) throw new Error("Failed to sign PSBT");

    console.log({ signedPsbt })
    const feeRate = await bitcoinsdk.openbook.utils.getMempoolFees();
    const params = {
      utxo: balance.utxo as string,
      seller: walletAddress as string,
      price: Number(price),
      feeRate: feeRate?.fastestFee || 2,
      psbt: signedPsbt
    }
    const { psbt: psbtForListing, inputsToSign: inputsToSignForListing } = await bitcoinsdk.openbook.getPsbtForSubmitOrderOnchain(params)
    console.log({
      psbtForListing,
      inputsToSignForListing
    })
    const signedPsbtForListing = await signPSBT(psbtForListing, {
      inputsToSign: inputsToSignForListing,
      autoFinalized: false,
      broadcast: true,
    });

    const tx = bitcoin.Psbt.fromHex(signedPsbtForListing as string);
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
              <p className="text-sm font-medium text-primary">{error?.message}</p>
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
          <BadgeDollarSign className="w-12 h-12 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-primary">List Order</h1>
          <p className="text-sm text-secondary mt-1">UTXO: {short_address(balance.utxo as string)}</p>
          <p className="text-sm text-secondary mt-1">Asset: {balance.asset}</p>
          <p className="text-sm text-secondary mt-1">Qty: {balance.qty_normalized}</p>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-secondary mb-1">
            Price for listing
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              id="price"
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border border-secondary bg-light/10 text-primary p-2 pr-16 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
            />
          </div>
          <p className="mt-1 text-xs text-secondary">
            {Number(price)} sats (${Number(Number(price) * btcPrice * 10 ** -8).toFixed(2)})
          </p>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-primary text-light border border-primary rounded-md py-3 px-4 text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          List Utxo for sell
        </button>
        <p className="text-xs text-center text-secondary mt-4">
          Listing an UTXO will make it available for purchase by other users.
        </p>
      </div>
    </form>
  );
}