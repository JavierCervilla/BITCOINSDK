import React from "react";
import { type ToastOptions } from "react-hot-toast";
interface ShowToastProps {
    content: React.ReactNode;
    type: "success" | "error" | "warning" | "info";
    options?: ToastOptions;
}
export declare const showToast: ({ content, type, options }: ShowToastProps) => string;
export {};
