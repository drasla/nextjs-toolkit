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
import { getScrollbarWidth } from "../func_style";

export type BackdropProps = {
    disableEscapeKey?: boolean;
    disableBackdrop?: boolean;
    disableScrollLock?: boolean;
    open: boolean;
    onClose: VoidFunction;
} & PropsWithChildren;

export function Backdrop({
    disableEscapeKey = false,
    disableBackdrop,
    disableScrollLock = false,
    open,
    onClose,
    children,
}: BackdropProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpacity, setIsOpacity] = useState(false);
    const initialRender = useRef(true);

    const originalScrollPosition = useRef(0);
    const originalBodyStyle = useRef<{
        overflow: string;
        position: string;
        top: string;
        width: string;
        paddingRight: string;
    }>({
        overflow: "",
        position: "",
        top: "",
        width: "",
        paddingRight: "",
    });

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

    useEffect(() => {
        if (disableScrollLock) return;

        if (open) {
            originalScrollPosition.current = window.scrollY;
            const body = document.body;

            originalBodyStyle.current = {
                overflow: body.style.overflow,
                position: body.style.position,
                top: body.style.top,
                width: body.style.width,
                paddingRight: body.style.paddingRight,
            };

            const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;

            if (hasScrollbar) {
                const scrollbarWidth = getScrollbarWidth();

                const computedStyle = window.getComputedStyle(body);
                const currentPaddingRight = parseInt(computedStyle.paddingRight) || 0;

                body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
            }

            body.style.overflow = "hidden";
            body.style.position = "fixed";
            body.style.top = `-${originalScrollPosition.current}px`;
            body.style.width = "100%";
        } else {
            const body = document.body;
            body.style.overflow = originalBodyStyle.current.overflow;
            body.style.position = originalBodyStyle.current.position;
            body.style.top = originalBodyStyle.current.top;
            body.style.width = originalBodyStyle.current.width;
            body.style.paddingRight = originalBodyStyle.current.paddingRight;

            window.scrollTo(0, originalScrollPosition.current);
        }

        return () => {
            if (open && !disableScrollLock) {
                const body = document.body;
                body.style.overflow = "";
                body.style.position = "";
                body.style.top = "";
                body.style.width = "";

                window.scrollTo(0, originalScrollPosition.current);
            }
        };
    }, [open, disableScrollLock]);

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
