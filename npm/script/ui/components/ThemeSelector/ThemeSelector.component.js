"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeSelector = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Select = __importStar(require("@radix-ui/react-select"));
const lucide_react_1 = require("lucide-react");
const style_js_1 = require("../../utils/style.js");
function ThemeSelector({ variant = 'simple' }) {
    const [currentTheme, setCurrentTheme] = (0, react_2.useState)('bitcoin-dark');
    const [isDark, setIsDark] = (0, react_2.useState)(true);
    (0, react_2.useEffect)(() => {
        const theme = document.documentElement.getAttribute('data-theme') || 'bitcoin-dark';
        setCurrentTheme(theme);
        setIsDark(theme.includes('dark'));
    }, []);
    const handleThemeChange = (theme) => {
        const mode = isDark ? 'dark' : 'light';
        const newTheme = `${theme}-${mode}`;
        (0, style_js_1.toggleTheme)(newTheme);
        setCurrentTheme(newTheme);
    };
    const toggleMode = () => {
        const baseTheme = currentTheme.split('-')[0];
        const newTheme = isDark ? `${baseTheme}-light` : `${baseTheme}-dark`;
        setIsDark(!isDark);
        (0, style_js_1.toggleTheme)(newTheme);
        setCurrentTheme(newTheme);
    };
    if (variant === 'simple') {
        return (react_1.default.createElement("button", { type: "button", onClick: toggleMode, className: "p-2 rounded-lg hover:bg-primary hover:text-light transition-colors duration-200" }, isDark ? (react_1.default.createElement(lucide_react_1.Sun, { className: "w-5 h-5 text-primary" })) : (react_1.default.createElement(lucide_react_1.Moon, { className: "w-5 h-5 text-primary" }))));
    }
    return (react_1.default.createElement("div", { className: "flex items-center gap-4" },
        react_1.default.createElement(Select.Root, { value: currentTheme.split('-')[0], onValueChange: handleThemeChange },
            react_1.default.createElement(Select.Trigger, { "aria-label": "Theme", className: "flex items-center justify-between w-[150px] rounded-lg px-3 py-2 text-sm \n            cursor-pointer bg-light text-dark hover:text-primary border border-secondary hover:border-primary text-primary gap-2" },
                react_1.default.createElement(Select.Value, null),
                react_1.default.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4 opacity-50" })),
            react_1.default.createElement(Select.Portal, null,
                react_1.default.createElement(Select.Content, { className: "z-50 min-w-[150px] overflow-hidden rounded-lg border bg-light dark:bg-dark border-secondary shadow-lg", position: "popper", sideOffset: 5 },
                    react_1.default.createElement(Select.Viewport, { className: "p-2" }, style_js_1.themes
                        .map((style) => (react_1.default.createElement(Select.Item, { key: style, value: style, className: "relative flex items-center px-8 py-2 text-sm rounded-md cursor-pointer\n                    text-dark select-none hover:text-primary focus:bg-secondary/50 outline-none" },
                        react_1.default.createElement(Select.ItemText, null,
                            react_1.default.createElement("span", { className: "capitalize" }, style.split('-')[0])),
                        react_1.default.createElement(Select.ItemIndicator, { className: "absolute left-2 inline-flex items-center" },
                            react_1.default.createElement(lucide_react_1.Check, { className: "w-4 h-4" }))))))))),
        react_1.default.createElement("button", { type: "button", onClick: toggleMode, className: "cursor-pointer p-2 rounded-lg text-dark hover:text-primary  transition-colors duration-200 border border-dark hover:border-primary" }, isDark ? (react_1.default.createElement(lucide_react_1.Sun, { className: "w-5 h-5" })) : (react_1.default.createElement(lucide_react_1.Moon, { className: "w-5 h-5" })))));
}
exports.ThemeSelector = ThemeSelector;
exports.default = ThemeSelector;
