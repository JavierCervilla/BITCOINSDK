import React from "react";
interface MarketSectionProps {
    asset: string;
    supply: number;
    btcPrice: number;
}
export declare function MarketSection({ asset, supply, btcPrice }: Readonly<MarketSectionProps>): React.JSX.Element;
export {};
