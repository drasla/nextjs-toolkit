"use client";

import React, {
    isValidElement,
    forwardRef,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { SelectProps } from "./_types";
import { useDropdown } from "../menu";
import { twMerge } from "tailwind-merge";
import { getComponentSizeClass } from "../functions";
import { SelectContext } from "./context";
import { TbChevronDown } from "react-icons/tb";

const Select = forwardRef(function Select(
    {
        size = "medium",
        label,
        className,
        fullWidth,
        value = "",
        placeholder,
        shrink: shrinkProp,
        error,
        onChange,
        suffix: customSuffix,
        textAlign,
        menuClassName,
        children,
        displayValue,
        ...props
    }: SelectProps,
    ref: Ref<HTMLDivElement>,
) {
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { isOpen, toggle, renderMenu, anchorRef } = useDropdown<HTMLDivElement>({
        horizontal: "left",
        vertical: "bottom",
        className: twMerge([menuClassName]),
        offset: { y: 2 },
    });

    useEffect(() => {
        if (isOpen) {
            setIsFocused(true);
        } else {
            setIsFocused(false);
        }
    }, [isOpen]);

    const handleSelect = useCallback(
        (newValue: string) => {
            if (onChange) {
                onChange(newValue);
            }
            toggle();
        },
        [onChange, toggle],
    );

    const contextValue = useMemo(
        () => ({
            onChange: handleSelect,
            selectedValue: value,
        }),
        [handleSelect, value],
    );

    const selectedChild = useMemo(() => {
        if (displayValue) return displayValue;

        let selected: ReactNode = null;
        React.Children.forEach(children, child => {
            if (isValidElement<{ value: string | number; children: ReactNode }>(child)) {
                if (
                    "value" in child.props &&
                    child.props.value !== undefined &&
                    String(child.props.value) === String(value)
                ) {
                    selected = child.props.children;
                }
            }
        });

        return selected;
    }, [children, value, placeholder, displayValue]);

    const shrink = shrinkProp || value !== "" || isOpen;

    const shouldShowPlaceholder = useMemo(() => {
        return !selectedChild && (shrink || !label || isFocused);
    }, [selectedChild, shrink, label, isFocused]);

    const fieldsetClassName = twMerge(
        ["absolute", "inset-0"],
        ["rounded-lg", "border", "theme-border"],
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
        shrink
            ? ["text-xs", "-top-2", "transform-none"]
            : ["text-base", "top-1/2", "-translate-y-1/2"],
        isFocused && !error && "text-primary-main",
        error && "text-error-main",
    );

    const displayValueClassName = twMerge(
        ["flex-1", "outline-none", "bg-transparent", "z-1", "cursor-pointer"],
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
    );

    return (
        <div
            className={twMerge(["relative", fullWidth && "w-full", className])}
            ref={node => {
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
                containerRef.current = node;
            }}
            {...props}>
            <fieldset className={fieldsetClassName}>
                {shrink && label && <legend className={legendClassName}>{label}</legend>}
            </fieldset>

            <div
                ref={anchorRef}
                className={twMerge([innerContainerClassName, "cursor-pointer"])}
                onClick={toggle}>
                <div className={displayValueClassName}>
                    {selectedChild || (
                        <span
                            className={twMerge(
                                "text-disabled-main",
                                !shouldShowPlaceholder && "opacity-0",
                            )}>
                            {placeholder || " "}
                        </span>
                    )}
                </div>
                <div>
                    {customSuffix || (
                        <TbChevronDown
                            size={16}
                            className={twMerge([
                                "transition-all",
                                "duration-200",
                                isOpen && "rotate-180",
                            ])}
                        />
                    )}
                </div>
            </div>

            {label && <label className={floatingLabelClassName}>{label}</label>}

            {error && (
                <div className={twMerge(["mt-1", "px-3"], ["text-error-main", "text-xs"])}>
                    {error}
                </div>
            )}

            <SelectContext.Provider value={contextValue}>
                {renderMenu(<div className="py-1">{children}</div>)}
            </SelectContext.Provider>
        </div>
    );
});

export default Select;
