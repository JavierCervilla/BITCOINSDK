import type React from "react"
import { Toaster } from "react-hot-toast"

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

