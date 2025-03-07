"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsView = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const walletContext_js_1 = require("../../../context/walletContext.js");
const ThemeSelector_component_js_1 = require("../../ThemeSelector/ThemeSelector.component.js");
function SettingsView() {
    const { connected } = (0, walletContext_js_1.useWallet)();
    return (react_1.default.createElement("div", { className: "flex flex-col gap-6 p-4" },
        react_1.default.createElement("div", { className: "flex items-center gap-2 text-primary" },
            react_1.default.createElement(lucide_react_1.Settings, { className: "w-6 h-6" }),
            react_1.default.createElement("h1", { className: "text-2xl font-bold" }, "Settings")),
        react_1.default.createElement("div", { className: "space-y-6" },
            react_1.default.createElement("section", null,
                react_1.default.createElement("div", { className: "flex items-center gap-2 text-primary mb-6" },
                    react_1.default.createElement(lucide_react_1.Palette, { className: "w-5 h-5" }),
                    react_1.default.createElement("h2", { className: "text-xl font-semibold" }, "Theme Settings")),
                react_1.default.createElement(ThemeSelector_component_js_1.ThemeSelector, { variant: "full" })),
            !connected && (react_1.default.createElement("div", { className: "p-4 bg-primary/5 border border-primary/20 rounded-lg" },
                react_1.default.createElement("p", { className: "text-secondary text-center" }, "Connect your wallet to access additional settings"))))));
}
exports.SettingsView = SettingsView;
