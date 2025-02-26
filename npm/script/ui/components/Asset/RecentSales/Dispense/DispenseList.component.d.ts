import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface DispensesListProps {
    dispenses: XCPAPI.XCPAPIDispenser[];
    isLoading: boolean;
    btcPrice: number;
}
export declare const DispensesList: React.MemoExoticComponent<({ dispenses, isLoading, btcPrice }: Readonly<DispensesListProps>) => React.JSX.Element>;
export {};
