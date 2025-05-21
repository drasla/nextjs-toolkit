"use client";

import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren, forwardRef, Ref } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import ButtonServerSide from "./serverSide";
import { BUTTON_VARIANT, THEME_COLOR, THEME_SIZE } from "../../index";
import useRipple from "../../hooks/useRipple/base";
import { getComponentSizeClass } from "../functions";

export type ButtonProps = {
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    variant?: BUTTON_VARIANT;
    size?: THEME_SIZE;
    loading?: boolean;
    disabled?: boolean;
    color?: THEME_COLOR;
    onClick?: MouseEventHandler<HTMLButtonElement>;
} & PropsWithChildren;

const ButtonClient = dynamic(() => import("./clientSide"));

const Button = forwardRef(function Button(
    {
        type = "button",
        className,
        onClick,
        children,
        color,
        variant,
        size,
        disabled,
        loading = false,
        ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
) {
    const { containerRef, createRipple } = useRipple<HTMLButtonElement>(color);

    const mergeRefs = (element: HTMLButtonElement | null) => {
        if (typeof ref === 'function') {
            ref(element);
        } else if (ref) {
            ref.current = element;
        }
        if (containerRef) {
            containerRef.current = element;
        }
    };

    const mergedClassName = twMerge(
        ["relative", "overflow-hidden", "cursor-pointer"],
        ["rounded-md"],
        ["font-bold"],
        ["transition-colors", "duration-500"],
        getComponentSizeClass(size),
        getButtonColorClass(variant, color),
        (disabled || loading) && getButtonColorClass(variant, "disabled"),
        className,
    );

    if (onClick) {
        const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
            if (disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            createRipple(e);
            onClick(e);
        };
        return (
            <ButtonClient
                ref={mergeRefs}
                onClick={handleClick}
                {...props}
                className={mergedClassName}>
                {children}
            </ButtonClient>
        );
    }

    return (
        <ButtonServerSide ref={mergeRefs} {...props} className={twMerge(mergedClassName)}>
            {children}
        </ButtonServerSide>
    );
});

Button.displayName = 'Button';

export default Button;

const outlinedColorClasses: Record<string, string> = {
    primary: twMerge("border-primary-main", "text-primary-main", "border"),
    secondary: twMerge("border-secondary-main", "text-secondary-main", "border"),
    success: twMerge("border-success-main", "text-success-main", "border"),
    warning: twMerge("border-warning-main", "text-warning-main", "border"),
    error: twMerge("border-error-main", "text-error-main", "border"),
    info: twMerge("border-info-main", "text-info-main", "border"),
    disabled: twMerge("border-disabled-main", "text-disabled-main", "border"),
};

const filledColorClasses: Record<string, string> = {
    primary: twMerge("bg-primary-main", "text-primary-contrast"),
    secondary: twMerge("bg-secondary-main", "text-secondary-contrast"),
    success: twMerge("bg-success-main", "text-success-contrast"),
    warning: twMerge("bg-warning-main", "text-warning-contrast"),
    error: twMerge("bg-error-main", "text-error-contrast"),
    info: twMerge("bg-info-main", "text-info-contrast"),
    disabled: twMerge("bg-disabled-main", "text-disabled-contrast"),
};

const textColorClasses: Record<string, string> = {
    primary: twMerge("text-primary-main", ["hover:text-primary-contrast", "hover:bg-primary-main"]),
    secondary: twMerge("text-secondary-main", [
        "hover:text-secondary-contrast",
        "hover:bg-secondary-main",
    ]),
    success: twMerge("text-success-main", ["hover:text-success-contrast", "hover:bg-success-main"]),
    warning: twMerge("text-warning-main", ["hover:text-warning-contrast", "hover:bg-warning-main"]),
    error: twMerge("text-error-main", ["hover:text-error-contrast", "hover:bg-error-main"]),
    info: twMerge("text-info-main", ["hover:text-info-contrast", "hover:bg-info-main"]),
    disabled: twMerge("text-disabled-main", [
        "hover:text-disabled-contrast",
        "hover:bg-disabled-main",
    ]),
};

function getButtonColorClass(
    variant: BUTTON_VARIANT = "filled",
    color: THEME_COLOR = "primary",
): string {
    if (variant === "outlined") {
        return outlinedColorClasses[color];
    } else if (variant === "text") {
        return textColorClasses[color];
    }
    return filledColorClasses[color];
}