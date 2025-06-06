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
    const tooltipId = useRef(`tooltip-${Math.random().toString(36).substring(2, 11)}`);

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

    // 스크롤 컨테이너 찾기 함수
    const findScrollContainer = useCallback((element: HTMLElement | null): HTMLElement | null => {
        if (!element || element === document.body) return null;

        const computedStyle = window.getComputedStyle(element);
        const overflow = computedStyle.overflow + computedStyle.overflowX + computedStyle.overflowY;

        if (overflow.includes('auto') || overflow.includes('scroll')) {
            return element;
        }

        return findScrollContainer(element.parentElement);
    }, []);

    // 툴팁 위치 계산 함수
    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !tooltipRef.current) return;

        try {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            // 가까운 스크롤 컨테이너 찾기
            const scrollContainer = findScrollContainer(triggerRef.current);
            let containerScroll = { left: 0, top: 0 };
            let containerRect = { left: 0, top: 0, right: 0, bottom: 0 };

            if (scrollContainer) {
                containerScroll = {
                    left: scrollContainer.scrollLeft,
                    top: scrollContainer.scrollTop
                };
                containerRect = scrollContainer.getBoundingClientRect();
            }

            // 페이지 상의 실제 위치 계산
            let top = 0;
            let left = 0;

            // 위치 계산
            switch (position) {
                case "top":
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case "right":
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.right + 8;
                    break;
                case "bottom":
                    top = triggerRect.bottom + 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case "left":
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.left - tooltipRect.width - 8;
                    break;
            }

            // 스크롤 오프셋 추가 (전역 스크롤)
            top += window.scrollY;
            left += window.scrollX;

            // 화면 경계 체크
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (left < 0) {
                left = 4;
            } else if (left + tooltipRect.width > viewportWidth) {
                left = viewportWidth - tooltipRect.width - 4;
            }

            if (top < window.scrollY) {
                top = window.scrollY + 4;
            } else if (top + tooltipRect.height > window.scrollY + viewportHeight) {
                if (position === "bottom") {
                    // 아래 공간이 부족하면 위에 표시
                    top = triggerRect.top + window.scrollY - tooltipRect.height - 8;
                } else {
                    top = window.scrollY + viewportHeight - tooltipRect.height - 4;
                }
            }

            // 스크롤 컨테이너 내부에 있는 경우 컨테이너 내에서 올바르게 표시되도록 조정
            if (scrollContainer) {
                // 컨테이너 경계 체크
                if (left < containerRect.left) {
                    left = containerRect.left + 4;
                } else if (left + tooltipRect.width > containerRect.right) {
                    left = containerRect.right - tooltipRect.width - 4;
                }

                if (top < containerRect.top) {
                    top = containerRect.top + 4;
                } else if (top + tooltipRect.height > containerRect.bottom) {
                    top = containerRect.bottom - tooltipRect.height - 4;
                }
            }

            setTooltipPosition({ top, left });
        } catch (error) {
            console.error("Error calculating tooltip position:", error);
        }
    }, [position, findScrollContainer]);

    useEffect(() => {
        if (isVisible) {
            setTooltipInDOM(true);
            setIsFadingOut(false);
            clearTimeoutRef("remove");

            // 위치 계산은 툴팁이 DOM에 추가된 직후에 실행
            timeoutRefs.current.position = setTimeout(() => {
                calculatePosition();
                // 추가 계산을 위한 두 번째 타임아웃
                timeoutRefs.current.position = setTimeout(() => {
                    calculatePosition();
                }, 10);
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

    useEffect(() => {
        if (isVisible) {
            const handleResize = () => calculatePosition();

            const handleScroll = (e: Event) => {
                if (e.target === document ||
                    (e.target instanceof Node && triggerRef.current?.contains(e.target)) ||
                    findScrollContainer(triggerRef.current) === e.target) {
                    calculatePosition();
                }
            };

            window.addEventListener("resize", handleResize);
            window.addEventListener("scroll", handleScroll, true);

            // ResizeObserver로 엘리먼트 크기 변경 감지
            const resizeObserver = new ResizeObserver(() => {
                calculatePosition();
            });

            if (triggerRef.current) {
                resizeObserver.observe(triggerRef.current);
            }

            if (tooltipRef.current) {
                resizeObserver.observe(tooltipRef.current);
            }

            return () => {
                window.removeEventListener("resize", handleResize);
                window.removeEventListener("scroll", handleScroll, true);
                resizeObserver.disconnect();
            };
        }
    }, [isVisible, calculatePosition, findScrollContainer]);

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
                onBlur={handleMouseLeave}
                aria-describedby={isVisible ? tooltipId.current : undefined}
            >
                {children}
            </div>

            {tooltipInDOM &&
                createPortal(
                    <div
                        id={tooltipId.current}
                        ref={tooltipRef}
                        role="tooltip"
                        className={twMerge(
                            ["fixed", "z-[9999]", "px-2", "py-1"],
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