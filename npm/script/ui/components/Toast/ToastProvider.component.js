"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastProvider = void 0;
const react_hot_toast_1 = require("react-hot-toast");
const ToastProvider = ({ children }) => {
    return (React.createElement(React.Fragment, null,
        children,
        React.createElement(react_hot_toast_1.Toaster, null)));
};
exports.ToastProvider = ToastProvider;
