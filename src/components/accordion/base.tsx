"use client";

import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

type AccordionContextType = {
    expandedIndex: number | number[] | null;
    toggleItem: (index: number) => void;
    allowMultiple?: boolean;
};

export const AccordionContext = createContext<AccordionContextType>({
    expandedIndex: null,
    toggleItem: () => {},
    allowMultiple: false,
});

type AccordionProps = {
    defaultIndex?: number | number[];
    className?: string;
    allowMultiple?: boolean;
} & PropsWithChildren;

export function Accordion({
    children,
    defaultIndex = 0,
    className,
    allowMultiple = false,
}: AccordionProps) {
    const initialIndex = allowMultiple && Array.isArray(defaultIndex) ? defaultIndex : defaultIndex;

    const [expandedIndex, setExpandedIndex] = useState<number | number[] | null>(initialIndex);

    const toggleItem = useCallback(
        (index: number) => {
            setExpandedIndex(prevIndex => {
                if (allowMultiple) {
                    const prevArray = Array.isArray(prevIndex)
                        ? prevIndex
                        : prevIndex !== null
                          ? [prevIndex]
                          : [];

                    return prevArray.includes(index)
                        ? prevArray.filter(i => i !== index)
                        : [...prevArray, index];
                } else {
                    return prevIndex === index ? null : index;
                }
            });
        },
        [allowMultiple],
    );

    return (
        <AccordionContext.Provider value={{ expandedIndex, toggleItem }}>
            <div className={twMerge("w-full", className)}>{children}</div>
        </AccordionContext.Provider>
    );
}
