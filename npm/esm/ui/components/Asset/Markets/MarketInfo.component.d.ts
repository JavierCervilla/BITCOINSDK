import React from "react";
import type * as OpenbookAPI from "../../../../core/openbook/api";
import type * as XCPAPI from "../../../../core/counterparty/api_2";
interface MarketInfoProps {
    asset: string;
    btcPrice: number;
    swaps: OpenbookAPI.OpenbookAtomicSwapOrder[];
    dispensers: XCPAPI.XCPAPIDispenser[];
    isLoading: boolean;
    mcap: number;
    volume: number;
}
declare function MarketInfoComponent({ asset, btcPrice, swaps, dispensers, isLoading, mcap, volume }: Readonly<MarketInfoProps>): React.JSX.Element;
export declare const MarketInfo: React.MemoExoticComponent<typeof MarketInfoComponent>;
export {};
