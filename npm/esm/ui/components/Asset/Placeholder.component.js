import React from "react";
export const PlaceholderSVG = ({ bgColor = "gray", strokeColor = "white" }) => {
    return (React.createElement("svg", { "aria-label": "Asset placeholder image", width: "100%", height: "100%", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full bg-primary" },
        React.createElement("title", null, "Asset placeholder image"),
        React.createElement("rect", { width: "100", height: "100", rx: "10", fill: bgColor }),
        React.createElement("path", { d: "M30 60 L40 50 L60 70 L80 40", stroke: strokeColor, strokeWidth: "6", strokeLinecap: "round", strokeLinejoin: "round" }),
        React.createElement("circle", { cx: "35", cy: "35", r: "6", fill: strokeColor })));
};
