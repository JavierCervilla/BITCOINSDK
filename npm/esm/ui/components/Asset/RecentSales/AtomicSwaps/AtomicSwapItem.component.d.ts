import React from "react";
import type * as OpenbookAPI from "../../../../../core/openbook/api";
interface AtomicSwapItemProps {
    atomicSwap: OpenbookAPI.OpenbookAtomicSwap;
    btcPrice: number;
    asset: string;
}
declare function RecentSalesAtomicSwapItemComponent({ atomicSwap, btcPrice, asset }: Readonly<AtomicSwapItemProps>): React.JSX.Element;
export declare const RecentSalesAtomicSwapItem: React.MemoExoticComponent<typeof RecentSalesAtomicSwapItemComponent>;
export {};
