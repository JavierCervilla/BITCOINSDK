import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const themes = ["elegant", "bitcoin", "monochrome", "nordic", "NSID"];
export const toggleTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};
