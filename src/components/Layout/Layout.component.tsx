import { Outlet, useLocation } from "react-router-dom"
import { ViewModal } from "@/components/Views/ViewModal/ViewModal.component.tsx"
import { Header } from "@/components/Header/Header.component.tsx"

interface LayoutProps {
  isOpen: boolean
  onClose: () => void
}

export function Layout({ isOpen, onClose }: LayoutProps) {
  return (
    <ViewModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </ViewModal>
  )
} 