import React from "react";
interface ChartViewerProps {
    url?: string;
    width?: number | "100%";
    height?: number;
    agregationLevel?: "daily" | "monthly" | "yearly";
    eventKey?: string;
}
export declare function ChartViewer({ url, width, height, agregationLevel, eventKey }: ChartViewerProps): React.JSX.Element;
export {};
