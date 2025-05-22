"use client";

import { PropsWithChildren, useContext } from "react";
import { AccordionItemContext } from "./accordionItem";
import { twMerge } from "tailwind-merge";
import { TbChevronDown } from "react-icons/tb";

type AccordionHeaderProps = {
    className?: string;
} & PropsWithChildren;

export function AccordionHeader({ children, className }: AccordionHeaderProps) {
    const { isExpanded, toggleExpanded } = useContext(AccordionItemContext);

    return (
        <button
            className={twMerge(
                ["w-full", "px-2", "py-4"],
                ["flex", "justify-between", "items-center"],
                ["transition-all"],
                className,
            )}
            onClick={e => {
                e.preventDefault();
                toggleExpanded();
            }}>
            <span>{children}</span>
            <TbChevronDown
                className={twMerge(
                    ["w-5", "h-5"],
                    [
                        "transform",
                        "transition-transform",
                        "duration-200",
                        isExpanded ? "rotate-180" : "",
                    ],
                )}
            />
        </button>
    );
}
