"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTheme = exports.themes = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
exports.themes = ["elegant", "bitcoin", "monochrome", "nordic", "NSID"];
const toggleTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};
exports.toggleTheme = toggleTheme;
