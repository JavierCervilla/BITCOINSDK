import React from "react";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface AtomicSwapListProps {
    asset: string;
    swaps: OpenbookAPI.OpenbookAtomicSwap[];
    isLoading: boolean;
    btcPrice: number;
}
declare function RecentSalesAtomicSwapListComponent({ asset, swaps, isLoading, btcPrice }: Readonly<AtomicSwapListProps>): React.JSX.Element;
export declare const RecentSalesAtomicSwapList: React.MemoExoticComponent<typeof RecentSalesAtomicSwapListComponent>;
export {};
