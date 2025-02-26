"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const modalContext_js_1 = require("../../context/modalContext.js");
function Modal() {
    const { isOpen, closeModal, modalContent } = (0, modalContext_js_1.useModal)();
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { className: "bg-light p-6 rounded-lg shadow-xl max-w-md w-full" },
            react_1.default.createElement("div", { className: "flex justify-end items-center mb-4" },
                react_1.default.createElement("button", { type: "button", onClick: closeModal, className: "text-secondary hover:text-primary cursor-pointer" },
                    react_1.default.createElement(lucide_react_1.X, { className: "w-6 h-6" }))),
            modalContent)));
}
exports.Modal = Modal;
