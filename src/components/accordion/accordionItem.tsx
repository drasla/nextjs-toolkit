"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { AccordionContext } from "./base";
import { twMerge } from "tailwind-merge";

type AccordionItemContextType = {
    isExpanded: boolean;
    toggleExpanded: VoidFunction;
};

export const AccordionItemContext = createContext<AccordionItemContextType>({
    isExpanded: false,
    toggleExpanded: () => {},
});

type AccordionItemProps = {
    index: number;
    className?: string;
} & PropsWithChildren;

export function AccordionItem({ index, children, className }: AccordionItemProps) {
    const { expandedIndex, toggleItem } = useContext(AccordionContext);
    const isExpanded = Array.isArray(expandedIndex)
        ? expandedIndex.includes(index)
        : expandedIndex === index;

    const toggleExpanded = () => {
        toggleItem(index);
    };

    return (
        <AccordionItemContext.Provider value={{ isExpanded, toggleExpanded }}>
            <div className={twMerge("border-b", "theme-border", className)}>{children}</div>
        </AccordionItemContext.Provider>
    );
}
