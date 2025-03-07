"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceControl = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const modalContext_js_1 = require("../../../../context/modalContext.js");
function BalanceControl({ icon: Icon, label, action }) {
    const { openModal } = (0, modalContext_js_1.useModal)();
    const [showTooltip, setShowTooltip] = (0, react_2.useState)(false);
    const handleClick = () => {
        openModal(action);
    };
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);
    return (react_1.default.createElement("div", { className: "relative" },
        react_1.default.createElement("button", { type: "button", onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: "cursor-pointer flex items-center justify-center p-2 text-primary hover:text-secondary hover:bg-primary/10 rounded-full transition-colors", "aria-label": label },
            react_1.default.createElement(Icon, { className: "w-4 h-4" })),
        showTooltip && (react_1.default.createElement("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-semibold text-light bg-primary rounded shadow-lg" }, label))));
}
exports.BalanceControl = BalanceControl;
