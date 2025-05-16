"use client";

import React, { ReactNode, useState, useEffect, useCallback, useRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps extends PropsWithChildren {
    content: string | ReactNode;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
    contentClassName?: string;
    showArrow?: boolean;
    maxWidth?: string;
    disabled?: boolean;
    open?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
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
}) => {
    const [internalIsVisible, setInternalIsVisible] = useState(false);
    const [tooltipInDOM, setTooltipInDOM] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>({
        show: null,
        hide: null,
        remove: null
    });

    const isVisible = open !== undefined ? open : internalIsVisible;

    const clearTimeoutRef = useCallback((key: 'show' | 'hide' | 'remove') => {
        if (timeoutRefs.current[key]) {
            global.clearTimeout(timeoutRefs.current[key]!);
            timeoutRefs.current[key] = null;
        }
    }, []);

    const clearAllTimeouts = useCallback(() => {
        clearTimeoutRef('show');
        clearTimeoutRef('hide');
        clearTimeoutRef('remove');
    }, [clearTimeoutRef]);

    useEffect(() => {
        if (isVisible) {
            setTooltipInDOM(true);
            setIsFadingOut(false);
            clearTimeoutRef('remove');
        } else if (tooltipInDOM) {
            setIsFadingOut(true);
            clearTimeoutRef('remove');
            
            timeoutRefs.current.remove = setTimeout(() => {
                setTooltipInDOM(false);
            }, 200);
        }
        
        return () => clearTimeoutRef('remove');
    }, [isVisible, tooltipInDOM, clearTimeoutRef]);

    useEffect(() => {
        return clearAllTimeouts;
    }, [clearAllTimeouts]);

    useEffect(() => {
        if (open !== undefined && onOpenChange) {
            onOpenChange(open);
        }
    }, [open, onOpenChange]);

    const handleMouseEnter = useCallback(() => {
        if (disabled || open !== undefined) return;
        
        clearTimeoutRef('hide');
        clearTimeoutRef('remove');
        
        if (isFadingOut) {
            setIsFadingOut(false);
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
            return;
        }
        
        clearTimeoutRef('show');
        
        timeoutRefs.current.show = setTimeout(() => {
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
        }, delay);
    }, [disabled, open, isFadingOut, delay, onOpenChange, clearTimeoutRef]);

    const handleMouseLeave = useCallback(() => {
        if (open !== undefined) return;
        
        clearTimeoutRef('show');
        
        timeoutRefs.current.hide = setTimeout(() => {
            setInternalIsVisible(false);
            if (onOpenChange) onOpenChange(false);
        }, 200);
    }, [open, onOpenChange, clearTimeoutRef]);

    const handleTooltipMouseEnter = useCallback(() => {
        if (open !== undefined) return;
        
        clearTimeoutRef('hide');
        clearTimeoutRef('remove');
        
        if (isFadingOut) {
            setIsFadingOut(false);
            setInternalIsVisible(true);
            if (onOpenChange) onOpenChange(true);
        }
    }, [open, isFadingOut, onOpenChange, clearTimeoutRef]);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
    };
    
    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",
        right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
        left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent",
    };
    
    return (
        <div
            className={twMerge("relative inline-flex", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}>
            {children}
            
            {tooltipInDOM && (
                <div
                    className={twMerge(
                        "absolute z-50",
                        "bg-gray-800 text-white",
                        "px-2 py-1 rounded shadow-lg",
                        "text-sm",
                        "whitespace-normal",
                        isFadingOut ? "tooltip-fade-out" : "tooltip-fade-in",
                        maxWidth,
                        positionClasses[position],
                        contentClassName,
                    )}
                    style={{ pointerEvents: "auto" }}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    {content}
                    
                    {showArrow && (
                        <span
                            className={twMerge(
                                "absolute w-0 h-0",
                                "border-solid border-4",
                                "border-gray-800",
                                arrowClasses[position],
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
};