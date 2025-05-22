"use client";

import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { AccordionItemContext } from "./accordionItem";
import { twMerge } from "tailwind-merge";

type AccordionBodyProps = {
    className?: string;
} & PropsWithChildren;

export function AccordionBody({ children, className }: AccordionBodyProps) {
    const { isExpanded } = useContext(AccordionItemContext);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(height);
        }
    }, [children, isExpanded]);

    return (
        <div
            className={twMerge(["overflow-hidden"], ["transition-all", "duration-300"], className)}
            style={{
                maxHeight: isExpanded ? `${contentHeight}px` : "0px",
            }}>
            <div ref={contentRef} className={twMerge(["p-4"])}>
                {children}
            </div>
        </div>
    );
}
