import React from "react";
import type * as OpenbookAPI from "../../../core/openbook/api";
interface LastAtomicSwapsSalesProps {
    lastSales: OpenbookAPI.OpenbookAtomicSwap[];
    isLoading: boolean;
}
declare function LastAtomicSwapsSalesComponent({ lastSales, isLoading }: Readonly<LastAtomicSwapsSalesProps>): React.JSX.Element | null;
export declare const LastAtomicSwapsSales: React.MemoExoticComponent<typeof LastAtomicSwapsSalesComponent>;
export {};
