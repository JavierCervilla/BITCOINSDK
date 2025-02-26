import React from "react";
import type * as OpenbookAPI from "../../../core/openbook/api";
interface LastAtomicSwapsOrdersProps {
    lastOrders: OpenbookAPI.OpenbookAtomicSwapOrder[];
    isLoading: boolean;
}
declare function LastAtomicSwapsOrdersComponent({ lastOrders, isLoading }: Readonly<LastAtomicSwapsOrdersProps>): React.JSX.Element | null;
export declare const LastAtomicSwapsOrders: React.MemoExoticComponent<typeof LastAtomicSwapsOrdersComponent>;
export {};
