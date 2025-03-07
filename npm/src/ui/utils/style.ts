import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const themes = ["elegant", "bitcoin", "monochrome", "nordic", "NSID"]


export const toggleTheme = (theme: string) => {
  document.documentElement.setAttribute("data-theme", theme)
}