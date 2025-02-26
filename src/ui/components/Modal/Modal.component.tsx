import React from "react";
import { X } from "lucide-react"

import { useModal } from "../../../ui/context/modalContext.tsx"

export function Modal() {
  const { isOpen, closeModal, modalContent } = useModal()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-light p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-end items-center mb-4">
          <button type="button" onClick={closeModal} className="text-secondary hover:text-primary cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
        {modalContent}
      </div>
    </div>
  )
}
