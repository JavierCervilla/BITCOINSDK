"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderSVG = void 0;
const react_1 = __importDefault(require("react"));
const PlaceholderSVG = ({ bgColor = "gray", strokeColor = "white" }) => {
    return (react_1.default.createElement("svg", { "aria-label": "Asset placeholder image", width: "100%", height: "100%", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full bg-primary" },
        react_1.default.createElement("title", null, "Asset placeholder image"),
        react_1.default.createElement("rect", { width: "100", height: "100", rx: "10", fill: bgColor }),
        react_1.default.createElement("path", { d: "M30 60 L40 50 L60 70 L80 40", stroke: strokeColor, strokeWidth: "6", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("circle", { cx: "35", cy: "35", r: "6", fill: strokeColor })));
};
exports.PlaceholderSVG = PlaceholderSVG;
