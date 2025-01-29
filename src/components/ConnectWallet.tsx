import { useState, useRef, useEffect } from "react"
import { useWallet } from "@/context/walletContext"
import { Wallet, LogOut, Sun, Moon } from "lucide-react"

interface ConnectWalletButtonProps {
  readonly className?: string
  readonly wallets: Readonly<{ [key: string]: { label: string; icon: string } }>
  readonly theme?: string
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectWalletButton({
  className,
  wallets,
  theme = "bitcoin-dark",
}: Readonly<ConnectWalletButtonProps>) {
  const { walletAddress, connected, connectWallet, disconnectWallet } = useWallet()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative flex items-center gap-3 ${className}`} data-theme={theme}>
      {!connected ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl shadow-md bg-primary text-light hover:bg-hover transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-30 w-56 mt-2 border rounded-xl bg-light border-secondary shadow-lg">
              <div className="py-2">
                {Object.entries(wallets).map(([key, { label, icon }]) => (
                  <button
                    key={key}
                    onClick={async () => {
                      setShowDropdown(false)
                      await connectWallet(key)
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-dark hover:bg-hover hover:text-text-hover transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <img src={icon || "/placeholder.svg"} alt={label} className="w-6 h-6 mr-3" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 text-sm font-medium border rounded-lg bg-light text-dark border-primary">
            {shortenAddress(walletAddress as string)}
          </div>
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl shadow-md bg-primary text-light hover:bg-hover transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ConnectWalletButton

