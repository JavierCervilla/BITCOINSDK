import React from "react";
import type * as BTCAPI from "../../../core/bitcoin/api_2";
interface MarketSectionProps {
    asset: string;
    supply: number;
    btcPrice: BTCAPI.BTCPrice;
}
export declare function MarketSection({ asset, supply, btcPrice }: Readonly<MarketSectionProps>): React.JSX.Element;
export {};
