import type React from "react"
import { type Toast, type ToastOptions, toast } from "react-hot-toast"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

interface CustomToastProps {
  t: Toast
  message: React.ReactNode
  type: "success" | "error" | "warning" | "info"
}

const icons = {
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  error: <XCircle className="w-6 h-6 text-red-500" />,
  warning: <AlertCircle className="w-6 h-6 text-yellow-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
}

const CustomToast: React.FC<CustomToastProps> = ({ t, message, type }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-light shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-primary`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
          <div className="ml-3 flex-1">
            {message}
          </div>
        </div>
      </div>
      <div className="flex border-l border-primary">
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

interface ShowToastProps {
  content: React.ReactNode
  type: "success" | "error" | "warning" | "info"
  options?: ToastOptions
}

export const showToast = ({ content, type, options }: ShowToastProps) => {
  return toast.custom((t) => <CustomToast t={t} message={content} type={type} />, {
    duration: 100000,
    position: "top-right",
    ...options,
  })
}

