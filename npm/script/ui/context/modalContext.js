"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = exports.ModalProvider = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const ModalContext = (0, react_2.createContext)(undefined);
function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const [modalContent, setModalContent] = (0, react_2.useState)(null);
    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };
    return (react_1.default.createElement(ModalContext.Provider, { value: { isOpen, openModal, closeModal, modalContent } }, children));
}
exports.ModalProvider = ModalProvider;
const useModal = () => {
    const context = (0, react_2.useContext)(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
exports.useModal = useModal;
