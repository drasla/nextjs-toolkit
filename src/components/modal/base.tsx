"use client";

import { Backdrop, BackdropProps } from "../backdrop/base";
import { twMerge } from "tailwind-merge";

type Props = BackdropProps;

export function Modal({ open, onClose, children, disableEscapeKey, disableBackdrop }: Props) {
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
                    ])}>
                    {children}
                </div>
            </div>
        </Backdrop>
    );
}
