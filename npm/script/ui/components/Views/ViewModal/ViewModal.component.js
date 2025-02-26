"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModal = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
function ViewModal({ children, isOpen, onClose, className = "" }) {
    const modalRef = (0, react_2.useRef)(null);
    const [isVisible, setIsVisible] = (0, react_2.useState)(false);
    const [isAnimating, setIsAnimating] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        }
        else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);
    (0, react_2.useEffect)(() => {
        function handleClickOutside(event) {
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                event.target.classList.contains('modal-overlay')) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);
    if (!isVisible)
        return null;
    return (react_1.default.createElement("div", { className: `modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/99 p-4 sm:p-6 md:p-8 transition-opacity duration-600 ${isAnimating ? "opacity-100" : "opacity-0"}` },
        react_1.default.createElement("div", { ref: modalRef, className: `w-full h-full max-w-6xl mx-auto
          bg-light dark:bg-dark rounded-lg shadow-xl overflow-hidden flex flex-col 
          transition-all duration-300 transform ${isAnimating ? "opacity-100" : "opacity-0"} ${className}` },
            react_1.default.createElement("div", { className: "flex justify-between items-center p-4 border-b border-secondary" },
                react_1.default.createElement("button", { type: "button", onClick: onClose, className: "p-1 rounded-full hover:bg-secondary transition-colors duration-200" },
                    react_1.default.createElement(lucide_react_1.X, { size: 24, className: "text-primary cursor-pointer" }))),
            react_1.default.createElement("div", { className: "flex-grow p-4 overflow-y-auto text-secondary" }, children))));
}
exports.ViewModal = ViewModal;
