"use client";

import { Backdrop, BackdropProps } from "../backdrop";
import { twMerge } from "tailwind-merge";

type Props = BackdropProps & {
    paperClassName?: string;
};

export function Modal({
    open,
    onClose,
    children,
    disableEscapeKey,
    disableBackdrop,
    paperClassName,
}: Props) {
    if (!children) return null;

    return (
        <Backdrop open={open} onClose={onClose} {...{ disableEscapeKey, disableBackdrop }}>
            <div className={twMerge("flex", "flex-wrap")}>
                <div
                    className={twMerge([
                        "w-full",
                        "p-4",
                        "rounded-lg",
                        "shadow-xl",
                        "theme-paper",
                        paperClassName,
                    ])}>
                    {children}
                </div>
            </div>
        </Backdrop>
    );
}
