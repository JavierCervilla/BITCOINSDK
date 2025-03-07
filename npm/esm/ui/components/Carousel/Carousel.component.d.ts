import React from "react";
import { type ReactNode } from "react";
interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    itemKey: (item: T, index: number) => string;
}
export declare function Carousel<T>({ items, renderItem, itemKey }: CarouselProps<T>): React.JSX.Element | null;
export {};
