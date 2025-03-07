import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface DispenseItemProps {
    dispense: XCPAPI.XCPAPIDispense;
    btcPrice: number;
}
declare function DispenseItemComponent({ dispense, btcPrice }: Readonly<DispenseItemProps>): React.JSX.Element;
export declare const DispenseItem: React.MemoExoticComponent<typeof DispenseItemComponent>;
export {};
