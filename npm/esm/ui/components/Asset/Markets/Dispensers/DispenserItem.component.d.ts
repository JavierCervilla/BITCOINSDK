import React from "react";
import type * as XCPAPI from "../../../../../core/counterparty/api_2";
interface DispenserItemProps {
    dispenser: XCPAPI.XCPAPIDispenser;
    btcPrice: number;
}
declare function DispenserItemComponent({ dispenser, btcPrice }: Readonly<DispenserItemProps>): React.JSX.Element;
export declare const DispenserItem: React.MemoExoticComponent<typeof DispenserItemComponent>;
export {};
