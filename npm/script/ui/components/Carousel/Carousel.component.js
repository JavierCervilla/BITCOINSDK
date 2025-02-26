"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lucide_react_1 = require("lucide-react");
function Carousel({ items, renderItem, itemKey }) {
    const carouselRef = (0, react_2.useRef)(null);
    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };
    if (items.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "relative" },
        react_1.default.createElement("div", { ref: carouselRef, className: "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide", style: { scrollbarWidth: "none", msOverflowStyle: "none" } }, items.map((item, index) => (react_1.default.createElement("div", { key: itemKey(item, index), "data-index": index, className: "asset-card flex-shrink-0  m-2 snap-center" }, renderItem(item, index))))),
        react_1.default.createElement("button", { type: "button", onClick: () => scroll("left"), className: "cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/70 transition-colors", "aria-label": "Previous" },
            react_1.default.createElement(lucide_react_1.ChevronLeft, { size: 24 })),
        react_1.default.createElement("button", { type: "button", onClick: () => scroll("right"), className: "cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/70 transition-colors", "aria-label": "Next" },
            react_1.default.createElement(lucide_react_1.ChevronRight, { size: 24 }))));
}
exports.Carousel = Carousel;
