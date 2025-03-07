"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = void 0;
const react_1 = __importDefault(require("react"));
const react_hot_toast_1 = require("react-hot-toast");
const lucide_react_1 = require("lucide-react");
const icons = {
    success: react_1.default.createElement(lucide_react_1.CheckCircle, { className: "w-6 h-6 text-green-500" }),
    error: react_1.default.createElement(lucide_react_1.XCircle, { className: "w-6 h-6 text-red-500" }),
    warning: react_1.default.createElement(lucide_react_1.AlertCircle, { className: "w-6 h-6 text-yellow-500" }),
    info: react_1.default.createElement(lucide_react_1.Info, { className: "w-6 h-6 text-blue-500" }),
};
const CustomToast = ({ t, message, type }) => {
    return (react_1.default.createElement("div", { className: `${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-light shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-primary` },
        react_1.default.createElement("div", { className: "flex-1 w-0 p-4" },
            react_1.default.createElement("div", { className: "flex items-start" },
                react_1.default.createElement("div", { className: "flex-shrink-0 pt-0.5" }, icons[type]),
                react_1.default.createElement("div", { className: "ml-3 flex-1" }, message))),
        react_1.default.createElement("div", { className: "flex border-l border-primary" },
            react_1.default.createElement("button", { type: "button", onClick: () => react_hot_toast_1.toast.dismiss(t.id), className: "cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" },
                react_1.default.createElement(lucide_react_1.X, { className: "w-4 h-4" })))));
};
const showToast = ({ content, type, options }) => {
    return react_hot_toast_1.toast.custom((t) => react_1.default.createElement(CustomToast, { t: t, message: content, type: type }), {
        duration: 100000,
        position: "top-right",
        ...options,
    });
};
exports.showToast = showToast;
