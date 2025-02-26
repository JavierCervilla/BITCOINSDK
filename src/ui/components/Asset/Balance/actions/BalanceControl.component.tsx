import React from "react";
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

import { useModal } from "../../../../context/modalContext.tsx"

interface BalanceControlProps {
  icon: LucideIcon
  label: string
  action: React.ReactNode
}

export function BalanceControl({ icon: Icon, label, action }: Readonly<BalanceControlProps>): React.ReactNode {
  const { openModal } = useModal()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    openModal(action)
  }

  const handleMouseEnter = () => setShowTooltip(true)
  const handleMouseLeave = () => setShowTooltip(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer flex items-center justify-center p-2 text-primary hover:text-secondary hover:bg-primary/10 rounded-full transition-colors"
        aria-label={label}
      >
        <Icon className="w-4 h-4" />
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-semibold text-light bg-primary rounded shadow-lg">
          {label}
        </div>
      )}
    </div>
  )
}

