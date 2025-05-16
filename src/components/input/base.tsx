"use client";

import {
    ChangeEventHandler,
    FocusEvent,
    KeyboardEvent,
    InputHTMLAttributes,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { THEME_COLOR, THEME_SIZE } from "../../index";
import { getComponentSizeClass } from "../functions";

export interface InputProps extends PropsWithChildren {
    className?: string;
    label?: string;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    size?: THEME_SIZE;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    required?: boolean;
    color?: THEME_COLOR;
    fullWidth?: boolean;
    shrink?: boolean;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Input({
    size = "medium",
    type = "text",
    label,
    className,
    fullWidth,
    value = "",
    placeholder,
    shrink,
    error,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(shrink ? shrink : false);
    const [parentBgColor, setParentBgColor] = useState<string>("transparent");
    const containerRef = useRef<HTMLDivElement>(null);

    const mergedClassName = twMerge(
        ["box-border"],
        error && "border-error-main",
        getComponentSizeClass(size),
        className,
    );

    const handler = {
        onFucus: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
        },
        onBlur: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
        },
        onNumberKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            const allowedKeys = ["ArrowUp", "ArrowDown", "Backspace", "Delete", "Enter"];
            if (allowedKeys.includes(e.key) || (e.key >= "0" && e.key <= "9")) {
                return;
            }
            e.preventDefault();
        },
    };

    useEffect(() => {
        let parent = containerRef.current?.parentElement;
        while (parent) {
            const bgColor = getComputedStyle(parent).backgroundColor;
            if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
                setParentBgColor(bgColor);
                break;
            }
            parent = parent.parentElement;
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={twMerge("relative", fullWidth ? "w-full" : "bg-inherit")}>
            {label && (
                <label
                    className={twMerge(
                        "relative",
                        "absolute",
                        "left-3",
                        "transition-all",
                        "pointer-events-none",
                        "px-1",
                        isFocused || (value !== undefined && value !== "")
                            ? "-top-2 text-sm"
                            : "top-2.5 text-base",
                        error && "text-error-main",
                    )}
                    style={{ background: parentBgColor }}>
                    {label}
                </label>
            )}
            <input
                className={twMerge(
                    "border",
                    "rounded-md",
                    "bg-transparent",
                    "focus:outline-none",
                    mergedClassName,
                    fullWidth ? "w-full" : "",
                    className,
                )}
                type={type}
                placeholder={isFocused ? placeholder : undefined}
                onFocusCapture={shrink ? undefined : handler.onFucus}
                onBlurCapture={shrink ? undefined : handler.onBlur}
                onKeyDown={
                    type === "number" || type === "tel" ? handler.onNumberKeyDown : undefined
                }
                {...props}
            />
            {error && <div className={twMerge(["text-error-main", "text-sm"])}>{error}</div>}
        </div>
    );
}

export default Input;
