"use client";

import {
    ChangeEventHandler,
    FocusEvent,
    KeyboardEvent,
    InputHTMLAttributes,
    PropsWithChildren,
    useRef,
    useState,
    Ref,
    forwardRef,
    ChangeEvent,
    ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { getComponentSizeClass, getTextAlignClass } from "../func_style";
import { THEME_COLOR, THEME_SIZE } from "../../types";

export type InputProps = {
    className?: string;
    label?: string;
    size?: THEME_SIZE;
    disabled?: boolean;
    value?: string;
    color?: THEME_COLOR;
    fullWidth?: boolean;
    shrink?: boolean;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    formatMode?: "numeric" | "uppercase" | "lowercase" | "alphanumeric";
    prefix?: ReactNode;
    suffix?: ReactNode;
    textAlign?: "left" | "center" | "right";
    inputPrefix?: string;
    inputSuffix?: string;
    helperText?: string;
} & PropsWithChildren &
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">;

const Input = forwardRef(function Input(
    {
        size = "medium",
        type = "text",
        label,
        className,
        fullWidth,
        value = "",
        placeholder,
        shrink: shrinkProp,
        error,
        onKeyDown,
        formatMode,
        onChange,
        prefix,
        suffix,
        textAlign,
        inputPrefix = "",
        inputSuffix = "",
        helperText,
        ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
) {
    const shrink = shrinkProp || !!prefix;
    const [isFocused, setIsFocused] = useState(shrink);
    const inputRef = useRef<HTMLInputElement>(null);

    // 기존 로직 유지
    const displayValue = `${inputPrefix}${value}${inputSuffix}`;

    // 기존 prefixSuffixUtils 유지
    const prefixSuffixUtils = {
        getValidRange: () => {
            const prefixLength = inputPrefix.length;
            const valueLength = value.length;
            return {
                start: prefixLength,
                end: prefixLength + valueLength,
                total: prefixLength + valueLength + inputSuffix.length,
            };
        },

        enforceCursorPosition: () => {
            if (!inputRef.current) return;

            const cursorStart = inputRef.current.selectionStart || 0;
            const cursorEnd = inputRef.current.selectionEnd || 0;
            const range = prefixSuffixUtils.getValidRange();

            if (cursorStart !== cursorEnd) {
                const newStart = Math.max(cursorStart, range.start);
                const newEnd = Math.min(cursorEnd, range.end);

                if (newStart !== cursorStart || newEnd !== cursorEnd) {
                    inputRef.current.setSelectionRange(newStart, newEnd);
                }
            } else if (cursorStart < range.start) {
                inputRef.current.setSelectionRange(range.start, range.start);
            } else if (cursorStart > range.end) {
                inputRef.current.setSelectionRange(range.end, range.end);
            }
        },

        handlePrefixSuffixChange: (e: ChangeEvent<HTMLInputElement>, isPrefix: boolean) => {
            if (onChange) {
                onChange({
                    ...e,
                    target: { ...e.target, value },
                    currentTarget: { ...e.currentTarget, value },
                } as ChangeEvent<HTMLInputElement>);
            }

            setTimeout(() => {
                if (!inputRef.current) return;
                const range = prefixSuffixUtils.getValidRange();
                const position = isPrefix ? range.start : range.end;
                inputRef.current.setSelectionRange(position, position);
            }, 0);
        },
    };

    const handler = {
        onFocus: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            prefixSuffixUtils.enforceCursorPosition();
        },
        onBlur: (_: FocusEvent<HTMLInputElement>) => {
            setIsFocused(value !== "" || !!prefix);
        },
        isAllowedKeyCombo: (e: KeyboardEvent<HTMLInputElement>) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            if (isCtrlOrCmd && ["a", "c", "v", "x", "z"].includes(e.key.toLowerCase())) {
                return true;
            }

            const navigationKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Backspace",
                "Delete",
                "Enter",
                "Tab",
                "Escape",
                "Home",
                "End",
                "PageUp",
                "PageDown",
            ];

            return navigationKeys.includes(e.key);
        },
        onNumberKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            if (handler.isAllowedKeyCombo(e)) return;
            if ((e.key >= "0" && e.key <= "9") || e.key === "-" || e.key === ".") return;
            e.preventDefault();
        },
        onUppercaseKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            if (handler.isAllowedKeyCombo(e)) return;

            if (e.key.length === 1) {
                e.preventDefault();
                const input = e.currentTarget;
                const start = input.selectionStart ?? 0;
                const end = input.selectionEnd ?? 0;

                const newValue =
                    value.substring(0, start - inputPrefix.length) +
                    e.key.toUpperCase() +
                    value.substring(end - inputPrefix.length);

                if (onChange) {
                    onChange({
                        target: { value: newValue },
                        currentTarget: { value: newValue },
                    } as ChangeEvent<HTMLInputElement>);

                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.setSelectionRange(start + 1, start + 1);
                        }
                    }, 0);
                }
            }
        },
        onLowercaseKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            if (handler.isAllowedKeyCombo(e)) return;

            if (e.key.length === 1) {
                e.preventDefault();
                const input = e.currentTarget;
                const start = input.selectionStart ?? 0;
                const end = input.selectionEnd ?? 0;

                const newValue =
                    value.substring(0, start - inputPrefix.length) +
                    e.key.toLowerCase() +
                    value.substring(end - inputPrefix.length);

                if (onChange) {
                    onChange({
                        target: { value: newValue },
                        currentTarget: { value: newValue },
                    } as ChangeEvent<HTMLInputElement>);

                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.setSelectionRange(start + 1, start + 1);
                        }
                    }, 0);
                }
            }
        },
        onAlphanumericKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            if (handler.isAllowedKeyCombo(e)) return;
            if (/^[a-zA-Z0-9.-]$/.test(e.key)) return;
            e.preventDefault();
        },
        handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
            const range = prefixSuffixUtils.getValidRange();

            if (
                e.key === "Backspace" &&
                inputRef.current?.selectionStart === range.start &&
                inputRef.current?.selectionEnd === range.start &&
                value === ""
            ) {
                e.preventDefault();
                return;
            }

            if (
                e.key === "Delete" &&
                inputRef.current?.selectionStart === range.end &&
                inputRef.current?.selectionEnd === range.end
            ) {
                e.preventDefault();
                return;
            }

            if (onKeyDown) {
                onKeyDown(e);
            } else if (type === "number" || type === "tel" || formatMode === "numeric") {
                handler.onNumberKeyDown(e);
            } else if (formatMode === "uppercase") {
                handler.onUppercaseKeyDown(e);
            } else if (formatMode === "lowercase") {
                handler.onLowercaseKeyDown(e);
            } else if (formatMode === "alphanumeric") {
                handler.onAlphanumericKeyDown(e);
            }
        },
        handleKeyUp: (e: KeyboardEvent<HTMLInputElement>) => {
            if (
                ["Home", "End", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
            ) {
                prefixSuffixUtils.enforceCursorPosition();
            }
        },
        handleChange: (e: ChangeEvent<HTMLInputElement>) => {
            const newDisplayValue = e.target.value;

            if (!newDisplayValue.startsWith(inputPrefix)) {
                prefixSuffixUtils.handlePrefixSuffixChange(e, true);
                return;
            }

            if (inputSuffix && !newDisplayValue.endsWith(inputSuffix)) {
                prefixSuffixUtils.handlePrefixSuffixChange(e, false);
                return;
            }

            let newValue = newDisplayValue.substring(inputPrefix.length);
            if (inputSuffix && newValue.endsWith(inputSuffix)) {
                newValue = newValue.substring(0, newValue.length - inputSuffix.length);
            }

            const cursorPos = e.target.selectionStart || 0;
            const adjustedCursorPos = Math.max(0, cursorPos - inputPrefix.length);

            if (onChange) {
                onChange({
                    ...e,
                    target: { ...e.target, value: newValue },
                    currentTarget: { ...e.currentTarget, value: newValue },
                } as ChangeEvent<HTMLInputElement>);
            }

            setTimeout(() => {
                if (inputRef.current) {
                    const newPos = Math.min(
                        inputPrefix.length + newValue.length,
                        inputPrefix.length + adjustedCursorPos,
                    );
                    inputRef.current.setSelectionRange(newPos, newPos);
                }
            }, 0);
        },
    };

    const isActive = isFocused || value !== "" || !!prefix;

    const fieldsetClassName = twMerge(
        ["absolute", "inset-0", "rounded-lg", "border", "border-disabled-main"],
        ["transition-colors", "pointer-events-none"],
        isFocused ? "border-primary-main" : "",
        error ? "border-error-main" : "",
    );

    const legendClassName = twMerge(["invisible", "ml-2.5", "px-0.5", "h-0"]);

    const innerContainerClassName = twMerge(
        ["flex", "items-center", "gap-3", "px-3"],
        getComponentSizeClass(size),
    );

    const floatingLabelClassName = twMerge(
        ["absolute", "left-3", "px-1"],
        ["pointer-events-none", "transition-all", "duration-200"],
        isActive
            ? ["text-xs", "-top-2", "transform-none"]
            : ["text-base", "top-1/2", "-translate-y-1/2"],
        isFocused && !error && "text-primary-main",
        error && "text-error-main",
    );

    return (
        <div className={twMerge("w-full", className)}>
            <div className={twMerge(["relative", fullWidth && "w-full"])}>
                <fieldset className={fieldsetClassName}>
                    {isActive && label && <legend className={legendClassName}>{label}</legend>}
                </fieldset>

                <div className={innerContainerClassName}>
                    {prefix && <div>{prefix}</div>}
                    <input
                        ref={node => {
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                            inputRef.current = node;
                        }}
                        className={twMerge(
                            ["flex-1", "outline-none", "bg-transparent", "z-1"],
                            getTextAlignClass(textAlign),
                        )}
                        type={type}
                        placeholder={label && !isFocused ? undefined : placeholder}
                        onFocusCapture={e => {
                            if (!shrink) handler.onFocus(e);
                        }}
                        onBlurCapture={shrink ? undefined : handler.onBlur}
                        onKeyDown={handler.handleKeyDown}
                        onKeyUp={handler.handleKeyUp}
                        onClick={prefixSuffixUtils.enforceCursorPosition}
                        onMouseUp={prefixSuffixUtils.enforceCursorPosition}
                        value={displayValue}
                        onChange={handler.handleChange}
                        {...props}
                    />
                    {suffix && <div>{suffix}</div>}
                </div>

                {label && <label className={floatingLabelClassName}>{label}</label>}
            </div>
            {(error || helperText) && (
                <div
                    className={twMerge(
                        ["text-xs", "mt-1", "px-3"],
                        error ? "text-error-main" : "text-disabled-main",
                    )}>
                    {error || helperText}
                </div>
            )}
        </div>
    );
});

export default Input;
