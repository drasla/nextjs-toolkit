"use client";

import {
    MouseEventHandler,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

export type BackdropProps = {
    disableEscapeKey?: boolean;
    disableBackdrop?: boolean;
    open: boolean;
    onClose: VoidFunction;
} & PropsWithChildren;

export function Backdrop({
    disableEscapeKey = false,
    disableBackdrop,
    open,
    onClose,
    children,
}: BackdropProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpacity, setIsOpacity] = useState(false);
    const initialRender = useRef(true);

    useEffect(() => {
        if (open) {
            setIsVisible(true);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsOpacity(true);
                });
            });
        } else {
            setIsOpacity(false);
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            if (open) {
                setIsOpacity(true);
            }
        }
    }, [open]);

    const onEscPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape" && !disableEscapeKey) {
                onClose();
            }
        },
        [disableEscapeKey, onClose],
    );

    const handleOnClick: MouseEventHandler<HTMLDivElement> = _ => {
        if (disableBackdrop) return;
        onClose();
    };

    useEffect(() => {
        if (!open || disableEscapeKey) {
            return;
        }

        window.addEventListener("keydown", onEscPress);

        return () => {
            window.removeEventListener("keydown", onEscPress);
        };
    }, [onEscPress, open, disableEscapeKey]);

    if (!isVisible || !children) return null;

    return (
        <div
            className={twMerge(
                ["w-screen", "h-dvh", "fixed", "left-0", "top-0", "z-100"],
                ["flex", "justify-center", "items-center"],
                ["backdrop-blur-sm", "bg-gray-300/75"],
                ["transition-all", "duration-300", "ease-in-out", "transform"],
                isOpacity ? "opacity-100" : ["opacity-0"],
            )}
            onClick={handleOnClick}>
            <div
                className={twMerge(
                    ["px-0.5", "z-110", "pointer-events-auto", "lg:px-0"],
                    ["transition-all", "duration-300", "ease-in-out"],
                    [isOpacity ? "scale-100" : "scale-80"],
                )}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
