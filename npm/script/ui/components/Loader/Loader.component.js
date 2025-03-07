"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const react_1 = __importDefault(require("react"));
const style_js_1 = require("../../utils/style.js");
function Loader({ className, size = 80 }) {
    return (react_1.default.createElement("div", { className: "flex items-center justify-center h-full w-full" },
        react_1.default.createElement("div", { className: (0, style_js_1.cn)("animate-spin rounded-full border-b-6 border-primary ", className), style: {
                width: `${size}px`,
                height: `${size}px`,
            } })));
}
exports.Loader = Loader;
