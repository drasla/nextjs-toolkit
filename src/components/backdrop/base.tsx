"use client";

import { MouseEventHandler, PropsWithChildren, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface BackdropProps extends PropsWithChildren {
    disableEscapeKey?: boolean;
    open: boolean;
    onClose: VoidFunction;
}

export function Backdrop({ disableEscapeKey, open, onClose, children }: BackdropProps) {
    const onEscPress = useCallback(
        (e: KeyboardEvent) => {
            if (disableEscapeKey && e.key === "Escape") {
                onClose();
            }
        },
        [disableEscapeKey, onClose],
    );

    const handleOnClick: MouseEventHandler<HTMLDivElement> = _ => {
        onClose();
    };

    useEffect(() => {
        if (disableEscapeKey) {
            return;
        }

        if (open) {
            window.addEventListener("keydown", onEscPress);
        } else {
            window.removeEventListener("keydown", onEscPress);
        }

        return () => {
            window.removeEventListener("keydown", onEscPress);
        };
    }, [onEscPress, open, disableEscapeKey]);

    if (!children) return null;

    if (!open) return null;

    return (
        <div
            className={twMerge(
                ["w-full", "h-full", "fixed", "left-0", "top-0", "z-100"],
                ["flex", "justify-center", "items-center"],
                ["backdrop-blue-sm"],
            )}
            onClick={handleOnClick}>
            <div
                className={twMerge("px-0.5", "z-110", "pointer-events-auto", "lg:px-0")}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
