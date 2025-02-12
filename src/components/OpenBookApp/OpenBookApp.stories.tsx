import { useState } from "react"
import { OpenBookApp } from "./OpenBookApp.component.tsx"
import "@/styles/tailwind.css"
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector.component.tsx"

export const OpenBookAppStory = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-light p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">OpenBook SDK Demo</h1>
        <ThemeSelector />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-light px-6 py-3 rounded-xl font-semibold hover:bg-hover transition-all duration-300 transform hover:scale-105"
        >
          Launch OpenBook
        </button>

        <div className="text-secondary text-center max-w-md">
          <p className="text-sm opacity-75">
            This is a demo of the OpenBook SDK. Click the button above to launch the modal interface.
          </p>
        </div>
      </div>

      <OpenBookApp 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        theme="bitcoin-dark"
      />
    </div>
  )
}

// Metadata para Ladle/Storybook
OpenBookAppStory.storyName = "OpenBook App"
OpenBookAppStory.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      component: 'A complete demo of the OpenBook SDK modal interface with routing and wallet integration.',
    },
  },
} 