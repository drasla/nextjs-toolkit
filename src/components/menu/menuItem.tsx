"use client";

import { ReactNode, useContext } from "react";
import { MenuContext } from "./menu";
import { twMerge } from "tailwind-merge";

type MenuItemProps = {
    onClick?: VoidFunction;
    disabled?: boolean;
    className?: string;
    icon?: ReactNode;
} & PropsWithChildren;

export function MenuItem({ children, onClick, disabled = false, className, icon }: MenuItemProps) {
    const { close } = useContext(MenuContext);

    const handleClick = () => {
        if (disabled) return;

        if (onClick) {
            onClick();
            close();
        }
    };

    return (
        <div
            onClick={handleClick}
            className={twMerge(
                ["px-4", "py-2"],
                ["text-sm", "text-gray-700"],
                ["flex", "items-center", "gap-2"],
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer",
                className,
            )}>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </div>
    );
}
