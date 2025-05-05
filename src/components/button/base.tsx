"use client";

import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import ButtonServerSide from "./serverSide";
import { BUTTON_VARIANT, THEME_COLOR, THEME_SIZE } from "../../index";
import useRipple from "../../hooks/useRipple/base";

export interface ButtonProps extends PropsWithChildren {
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    variant?: BUTTON_VARIANT;
    size?: THEME_SIZE;
    loading?: boolean;
    disabled?: boolean;
    color?: THEME_COLOR;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonClient = dynamic(() => import("./clientSide"));

function Button({
    className,
    onClick,
    children,
    color,
    variant,
    size,
    disabled,
    ...props
}: ButtonProps) {
    const { containerRef, createRipple } = useRipple<HTMLButtonElement>(color);

    const mergedClassName = twMerge(
        ["relative", "overflow-hidden", "cursor-pointer"],
        ["rounded-md"],
        ["font-bold"],
        getButtonSizeClass(size),
        getButtonColorClass(variant, color),
        disabled && getButtonColorClass(variant, "disabled"),
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
                ref={containerRef}
                onClick={handleClick}
                {...props}
                className={mergedClassName}>
                {children}
            </ButtonClient>
        );
    }

    return (
        <ButtonServerSide {...props} className={twMerge(mergedClassName)}>
            {children}
        </ButtonServerSide>
    );
}

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

function getButtonColorClass(
    variant: BUTTON_VARIANT = "filled",
    color: THEME_COLOR = "primary",
): string {
    if (variant === "outlined") {
        return outlinedColorClasses[color];
    }
    return filledColorClasses[color];
}

function getButtonSizeClass(size?: THEME_SIZE): string {
    switch (size) {
        case "large":
            return twMerge("h-10", "px-3", "text-lg");
        case "small":
            return twMerge("h-8", "px-2", "text-sm");
        default:
            return twMerge("h-9", "px-3", "text-base");
    }
}
