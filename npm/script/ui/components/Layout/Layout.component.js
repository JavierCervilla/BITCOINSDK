"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ViewModal_component_js_1 = require("../Views/ViewModal/ViewModal.component.js");
const Header_component_js_1 = require("../Header/Header.component.js");
function Layout({ isOpen, onClose }) {
    return (react_1.default.createElement(ViewModal_component_js_1.ViewModal, { isOpen: isOpen, onClose: onClose },
        react_1.default.createElement("div", { className: "flex flex-col h-full" },
            react_1.default.createElement(Header_component_js_1.Header, null),
            react_1.default.createElement("main", { className: "flex-1 overflow-auto" },
                react_1.default.createElement(react_router_dom_1.Outlet, null)))));
}
exports.Layout = Layout;
