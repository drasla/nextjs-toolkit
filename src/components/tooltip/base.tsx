"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipProps } from "./_types";
import { createPortal } from "react-dom";

export function Tooltip({
    children,
    content,
    position = "top",
    delay = 300,
    className,
    contentClassName,
    showArrow = true,
    maxWidth = "max-w-xs",
    disabled = false,
    open,
    onOpenChange,
}: TooltipProps) {
    const [internalIsVisible, setInternalIsVisible] = useState(false);
    const [tooltipInDOM, setTooltipInDOM] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>({
        show: null,
        hide: null,
        remove: null,
        position: null,
    });

    const isVisible = open !== undefined ? open : internalIsVisible;

    const clearTimeoutRef = useCallback((key: "show" | "hide" | "remove" | "position") => {
        if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]!);
            timeoutRefs.current[key] = null;
        }
    }, []);

    const clearAllTimeouts = useCallback(() => {
        clearTimeoutRef("show");
        clearTimeoutRef("hide");
        clearTimeoutRef("remove");
        clearTimeoutRef("position");
    }, [clearTimeoutRef]);

    // 툴팁 위치 계산 함수
    const calculatePosition = useCallback(() => {
        if (triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            let top = 0;
            let left = 0;

            // 위치 계산
            switch (position) {
                case "top":
                    top = triggerRect.top + scrollY - tooltipRect.height - 8;
                    left =
                        triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case "right":
                    top =
                        triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.right + scrollX + 8;
                    break;
                case "bottom":
                    top = triggerRect.bottom + scrollY + 8;
                    left =
                        triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case "left":
                    top =
                        triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.left + scrollX - tooltipRect.width - 8;
                    break;
            }

            // 화면 경계 체크
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (left < 0) {
                left = 4;
            } else if (left + tooltipRect.width > viewportWidth) {
                left = viewportWidth - tooltipRect.width - 4;
            }

            if (top < 0) {
                top = 4;
            } else if (top + tooltipRect.height > viewportHeight + scrollY) {
                top = triggerRect.top + scrollY - tooltipRect.height - 8;
            }

            setTooltipPosition({ top, left });
        }
    }, [position]);

    useEffect(() => {
        if (isVisible) {
            setTooltipInDOM(true);
            setIsFadingOut(false);
            clearTimeoutRef("remove");

            // 위치 계산은 툴팁이 DOM에 추가된 직후에 실행
            timeoutRefs.current.position = setTimeout(() => {
                calculatePosition();
            }, 0);
        } else if (tooltipInDOM) {
            setIsFadingOut(true);
            clearTimeoutRef("remove");

            timeoutRefs.current.remove = setTimeout(() => {
                setTooltipInDOM(false);
            }, 200);
        }

        return () => {
            clearTimeoutRef("remove");
            clearTimeoutRef("position");
        };
    }, [isVisible, tooltipInDOM, clearTimeoutRef, calculatePosition]);

    useEffect(() => {
        return clearAllTimeouts;
    }, [clearAllTimeouts]);

    useEffect(() => {
        if (open !== undefined && onOpenChange) {
            onOpenChange(open);
        }
    }, [open, onOpenChange]);

    // 윈도우 리사이즈나 스크롤 시 위치 재계산
    useEffect(() => {
        if (isVisible) {
            const handleResize = () => {
                calculatePosition();
            };

            window.addEventListener("resize", handleResize);
            window.addEventListener("scroll", handleResize, true);

            return () => {
                window.removeEventListener("resize", handleResize);
                window.removeEventListener("scroll", handleResize, true);
            };
        }
    }, [isVisible, calculatePosition]);

    const handleMouseEnter = useCallback(() => {
        if (disabled || open !== undefined) return;

        clearTimeoutRef("hide");
        clearTimeoutRef("remove");

        if (isFadingOut) {
            setIsFadingOut(false);
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
            return;
        }

        clearTimeoutRef("show");

        timeoutRefs.current.show = setTimeout(() => {
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
        }, delay);
    }, [disabled, open, isFadingOut, delay, onOpenChange, clearTimeoutRef]);

    const handleMouseLeave = useCallback(() => {
        if (open !== undefined) return;

        clearTimeoutRef("show");

        timeoutRefs.current.hide = setTimeout(() => {
            setInternalIsVisible(false);
            if (onOpenChange) onOpenChange(false);
        }, 200);
    }, [open, onOpenChange, clearTimeoutRef]);

    const handleTooltipMouseEnter = useCallback(() => {
        if (open !== undefined) return;

        clearTimeoutRef("hide");
        clearTimeoutRef("remove");

        if (isFadingOut) {
            setIsFadingOut(false);
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
        }
    }, [open, isFadingOut, onOpenChange, clearTimeoutRef]);

    return (
        <>
            <div
                ref={triggerRef}
                className={twMerge(["inline-block"], className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}>
                {children}
            </div>

            {tooltipInDOM &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={twMerge(
                            ["fixed", "z-50", "px-2", "py-1"],
                            ["bg-disabled-dark", "text-disabled-contrast"],
                            ["rounded", "shadow-lg", "whitespace-normal"],
                            "text-sm",
                            isFadingOut ? "tooltip-fade-out" : "tooltip-fade-in",
                            maxWidth,
                            contentClassName,
                        )}
                        style={{
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            pointerEvents: "auto",
                        }}
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        {content}

                        {showArrow && (
                            <span
                                className={twMerge(
                                    ["absolute", "w-0", "h-0"],
                                    ["border-solid", "border-4", "border-disabled-dark"],
                                    position === "top"
                                        ? "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent"
                                        : "",
                                    position === "right"
                                        ? "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent"
                                        : "",
                                    position === "bottom"
                                        ? "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent"
                                        : "",
                                    position === "left"
                                        ? "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent"
                                        : "",
                                )}
                            />
                        )}
                    </div>,
                    document.body,
                )}
        </>
    );
}
