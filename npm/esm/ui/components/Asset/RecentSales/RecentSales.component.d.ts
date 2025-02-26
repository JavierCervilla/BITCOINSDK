import React from "react";
import type * as OpenbookAPI from "../../../../core/openbook/api";
import type * as XCPAPI from "../../../../core/counterparty/api_2";
interface RecentSalesProps {
    asset: string;
    btcPrice: number;
    swaps: OpenbookAPI.OpenbookAtomicSwap[];
    dispenses: XCPAPI.XCPAPIDispenser[];
    isLoading: boolean;
}
declare function RecentSalesComponent({ asset, btcPrice, swaps, dispenses, isLoading }: Readonly<RecentSalesProps>): React.JSX.Element;
export declare const RecentSales: React.MemoExoticComponent<typeof RecentSalesComponent>;
export {};
