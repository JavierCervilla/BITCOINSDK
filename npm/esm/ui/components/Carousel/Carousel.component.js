import React from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Carousel({ items, renderItem, itemKey }) {
    const carouselRef = useRef(null);
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
    return (React.createElement("div", { className: "relative" },
        React.createElement("div", { ref: carouselRef, className: "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide", style: { scrollbarWidth: "none", msOverflowStyle: "none" } }, items.map((item, index) => (React.createElement("div", { key: itemKey(item, index), "data-index": index, className: "asset-card flex-shrink-0  m-2 snap-center" }, renderItem(item, index))))),
        React.createElement("button", { type: "button", onClick: () => scroll("left"), className: "cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/70 transition-colors", "aria-label": "Previous" },
            React.createElement(ChevronLeft, { size: 24 })),
        React.createElement("button", { type: "button", onClick: () => scroll("right"), className: "cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/70 transition-colors", "aria-label": "Next" },
            React.createElement(ChevronRight, { size: 24 }))));
}
