import { useState } from "react"
import { useModal } from "@/context/modalContext.tsx"

export function UTXOSendAction({ balance }) {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const { closeModal } = useModal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement send logic
    console.log("Sending", amount, "to", recipient)
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-secondary">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-secondary bg-light text-primary shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-secondary">
          Recipient
        </label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-secondary bg-light text-primary shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-light rounded-md py-2 hover:bg-primary/80 transition-colors"
      >
        Send
      </button>
    </form>
  )
}