import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface DispensersListProps {
    dispensers: XCPAPI.XCPAPIDispenser[];
    isLoading: boolean;
    btcPrice: number;
}
declare function DispensersListComponent({ dispensers, isLoading, btcPrice }: Readonly<DispensersListProps>): React.JSX.Element;
export declare const DispensersList: React.MemoExoticComponent<typeof DispensersListComponent>;
export {};
