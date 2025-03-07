import React from "react";
interface AssetImageProps {
    asset: {
        asset: string;
        description?: string;
    };
    className?: string;
    showStampIcon?: boolean;
}
export declare const Media: React.FC<AssetImageProps>;
export {};
