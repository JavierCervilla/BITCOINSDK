import React from "react";
import type { LucideIcon } from "lucide-react";
interface BalanceControlProps {
    icon: LucideIcon;
    label: string;
    action: React.ReactNode;
}
export declare function BalanceControl({ icon: Icon, label, action }: Readonly<BalanceControlProps>): React.ReactNode;
export {};
