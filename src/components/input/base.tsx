"use client";

import {
    ChangeEventHandler,
    InputHTMLAttributes,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends PropsWithChildren {
    className?: string;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    size?: THEME_SIZE;
    disabled?: boolean;
    color?: THEME_COLOR;
    fullWidth?: boolean;
    shrink?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Input({
    size = "medium",
    type = "text",
    label,
    className,
    fullWidth,
    value,
    placeholder,
    shrink,
    ...props
}: InputProps) {
    const [isFocused, setFocused] = useState(shrink ? shrink : false);
    const [parentBgColor, setParentBgColor] = useState<string>("transparent");
    const containerRef = useRef<HTMLDivElement>(null);

    let customClassName = twMerge("box-border");
    switch (size) {
        case "small":
            customClassName = twMerge(customClassName, "px-4", "py-2");
            break;
        case "large":
            customClassName = twMerge(customClassName, "px-4", "py-4");
            break;
        default:
            customClassName = twMerge(customClassName, "px-4", "py-3");
    }

    const handler = {
        onFucus: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
        },
        onBlur: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
        },
        onNumberKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            const allowedKeys = ["ArrowUp", "ArrowDown", "Backspace", "Delete", "Enter"];
            if (allowedKeys.includes(e.Key) || (e.key >= "0" && e.key <= "9")) {
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
                        isFocused || value ? "-top-2 text-sm text-blue-500" : "top-3 text-base",
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
                    customClassName,
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
        </div>
    );
}

export default Input;
