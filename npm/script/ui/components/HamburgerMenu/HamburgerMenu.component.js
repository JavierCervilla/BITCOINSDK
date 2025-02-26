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
exports.HamburgerMenu = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const DropdownMenu = __importStar(require("@radix-ui/react-dropdown-menu"));
const menuItems = [
    { name: "Home", id: "/", icon: lucide_react_1.Home },
    { name: "Market", id: "/market", icon: lucide_react_1.BarChart2 },
    { name: "Wallet", id: "/wallet", icon: lucide_react_1.Wallet2 },
    { name: "Settings", id: "/settings", icon: lucide_react_1.Settings },
];
function HamburgerMenu() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement(DropdownMenu.Root, null,
        react_1.default.createElement(DropdownMenu.Trigger, { asChild: true },
            react_1.default.createElement("button", { type: "button", className: "p-2 flex items-center justify-between text-dark  gap-2 cursor-pointer rounded-lg hover:border-primary hover:text-primary transition-colors border border-primary/20" },
                react_1.default.createElement(lucide_react_1.Menu, { className: "w-7 h-7" }))),
        react_1.default.createElement(DropdownMenu.Portal, null,
            react_1.default.createElement(DropdownMenu.Content, { className: "z-50 min-w-[10rem] overflow-hidden rounded-md border border-secondary bg-light p-1 shadow-md", sideOffset: 5 }, menuItems.map((item) => (react_1.default.createElement(DropdownMenu.Item, { key: item.id, className: " relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-dark hover:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary transition-colors", onClick: () => navigate(item.id) },
                react_1.default.createElement(item.icon, { className: "mr-2 h-4 w-4" }),
                react_1.default.createElement("span", null, item.name))))))));
}
exports.HamburgerMenu = HamburgerMenu;
