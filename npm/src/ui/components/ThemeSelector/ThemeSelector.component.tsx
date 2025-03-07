import React from "react";
import { useState, useEffect } from "react"
import * as Select from '@radix-ui/react-select'
import { Sun, Moon, Check, ChevronDown } from "lucide-react"

import { themes, toggleTheme } from "../../utils/style.js"

interface ThemeSelectorProps {
  variant?: 'simple' | 'full'
}

export function ThemeSelector({ variant = 'simple' }: ThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<string>('bitcoin-dark')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'bitcoin-dark'
    setCurrentTheme(theme)
    setIsDark(theme.includes('dark'))
  }, [])

  const handleThemeChange = (theme: string) => {
    const mode = isDark ? 'dark' : 'light'
    const newTheme = `${theme}-${mode}`
    toggleTheme(newTheme)
    setCurrentTheme(newTheme)
  }

  const toggleMode = () => {
    const baseTheme = currentTheme.split('-')[0]
    const newTheme = isDark ? `${baseTheme}-light` : `${baseTheme}-dark`
    setIsDark(!isDark)
    toggleTheme(newTheme)
    setCurrentTheme(newTheme)
  }

  if (variant === 'simple') {
    return (
      <button
        type="button"
        onClick={toggleMode}
        className="p-2 rounded-lg hover:bg-primary hover:text-light transition-colors duration-200"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-primary" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Select.Root 
        value={currentTheme.split('-')[0]} 
        onValueChange={handleThemeChange}
      >
        <Select.Trigger 
          aria-label="Theme"
          className="flex items-center justify-between w-[150px] rounded-lg px-3 py-2 text-sm 
            cursor-pointer bg-light text-dark hover:text-primary border border-secondary hover:border-primary text-primary gap-2"
        >
          <Select.Value />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content 
            className="z-50 min-w-[150px] overflow-hidden rounded-lg border bg-light dark:bg-dark border-secondary shadow-lg"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="p-2">
              {themes
                .map((style) => (
                  <Select.Item
                    key={style}
                    value={style}
                    className="relative flex items-center px-8 py-2 text-sm rounded-md cursor-pointer
                    text-dark select-none hover:text-primary focus:bg-secondary/50 outline-none"
                  >
                    <Select.ItemText>
                      <span className="capitalize">{style.split('-')[0]}</span>
                    </Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="w-4 h-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <button
        type="button"
        onClick={toggleMode}
        className="cursor-pointer p-2 rounded-lg text-dark hover:text-primary  transition-colors duration-200 border border-dark hover:border-primary"
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}

export default ThemeSelector