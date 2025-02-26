import React from "react";
import { useState, useEffect } from "react";
import * as Select from '@radix-ui/react-select';
import { Sun, Moon, Check, ChevronDown } from "lucide-react";
import { themes, toggleTheme } from "../../utils/style.js";
export function ThemeSelector({ variant = 'simple' }) {
    const [currentTheme, setCurrentTheme] = useState('bitcoin-dark');
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme') || 'bitcoin-dark';
        setCurrentTheme(theme);
        setIsDark(theme.includes('dark'));
    }, []);
    const handleThemeChange = (theme) => {
        const mode = isDark ? 'dark' : 'light';
        const newTheme = `${theme}-${mode}`;
        toggleTheme(newTheme);
        setCurrentTheme(newTheme);
    };
    const toggleMode = () => {
        const baseTheme = currentTheme.split('-')[0];
        const newTheme = isDark ? `${baseTheme}-light` : `${baseTheme}-dark`;
        setIsDark(!isDark);
        toggleTheme(newTheme);
        setCurrentTheme(newTheme);
    };
    if (variant === 'simple') {
        return (React.createElement("button", { type: "button", onClick: toggleMode, className: "p-2 rounded-lg hover:bg-primary hover:text-light transition-colors duration-200" }, isDark ? (React.createElement(Sun, { className: "w-5 h-5 text-primary" })) : (React.createElement(Moon, { className: "w-5 h-5 text-primary" }))));
    }
    return (React.createElement("div", { className: "flex items-center gap-4" },
        React.createElement(Select.Root, { value: currentTheme.split('-')[0], onValueChange: handleThemeChange },
            React.createElement(Select.Trigger, { "aria-label": "Theme", className: "flex items-center justify-between w-[150px] rounded-lg px-3 py-2 text-sm \n            cursor-pointer bg-light text-dark hover:text-primary border border-secondary hover:border-primary text-primary gap-2" },
                React.createElement(Select.Value, null),
                React.createElement(ChevronDown, { className: "h-4 w-4 opacity-50" })),
            React.createElement(Select.Portal, null,
                React.createElement(Select.Content, { className: "z-50 min-w-[150px] overflow-hidden rounded-lg border bg-light dark:bg-dark border-secondary shadow-lg", position: "popper", sideOffset: 5 },
                    React.createElement(Select.Viewport, { className: "p-2" }, themes
                        .map((style) => (React.createElement(Select.Item, { key: style, value: style, className: "relative flex items-center px-8 py-2 text-sm rounded-md cursor-pointer\n                    text-dark select-none hover:text-primary focus:bg-secondary/50 outline-none" },
                        React.createElement(Select.ItemText, null,
                            React.createElement("span", { className: "capitalize" }, style.split('-')[0])),
                        React.createElement(Select.ItemIndicator, { className: "absolute left-2 inline-flex items-center" },
                            React.createElement(Check, { className: "w-4 h-4" }))))))))),
        React.createElement("button", { type: "button", onClick: toggleMode, className: "cursor-pointer p-2 rounded-lg text-dark hover:text-primary  transition-colors duration-200 border border-dark hover:border-primary" }, isDark ? (React.createElement(Sun, { className: "w-5 h-5" })) : (React.createElement(Moon, { className: "w-5 h-5" })))));
}
export default ThemeSelector;
