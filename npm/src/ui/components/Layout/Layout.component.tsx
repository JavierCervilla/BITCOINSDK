import React from "react";
import { Outlet } from "react-router-dom"

import { ViewModal } from "../Views/ViewModal/ViewModal.component.js"
import { Header } from "../Header/Header.component.js"

interface LayoutProps {
  isOpen: boolean
  onClose: () => void
}

export function Layout({ isOpen, onClose }: Readonly<LayoutProps>) {
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