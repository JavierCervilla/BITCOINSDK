import React from "react";
const defaultUrl = "https://openbook.0.srcpad.pro/api/v1/charts/summary";
export function ChartViewer({ url = defaultUrl, width = "100%", height = 400, agregationLevel = "monthly", eventKey = "BITCOIN_TRANSACTIONS" }) {
    const endpoint = new URL(url);
    endpoint.searchParams.set("agregationLevel", agregationLevel);
    endpoint.searchParams.set("eventKey", eventKey);
    endpoint.searchParams.set("width", width.toString());
    endpoint.searchParams.set("height", `${height - 120}px`);
    endpoint.searchParams.set("color", "#E07C1A");
    return (React.createElement("div", null,
        React.createElement("iframe", { className: "rounded-lg border border-primary overflow-hidden", scrolling: "no", title: "chart", src: endpoint.toString(), width: width, height: height })));
}
