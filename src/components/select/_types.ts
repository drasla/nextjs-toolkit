import { InputHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { THEME_COLOR, THEME_SIZE } from "../../index";

export type SelectContextType = {
    onChange: (value: string) => void;
    selectedValue: string;
};

export type SelectProps = {
    className?: string;
    label?: string;
    size?: THEME_SIZE;
    disabled?: boolean;
    value?: string;
    color?: THEME_COLOR;
    fullWidth?: boolean;
    shrink?: boolean;
    error?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    suffix?: ReactNode;
    textAlign?: "left" | "center" | "right";
    menuClassName?: string;
    displayValue?: ReactNode;
} & PropsWithChildren &
    Omit<InputHTMLAttributes<HTMLDivElement>, "size" | "onChange" | "value">;

export type OptionProps = {
    value: string;
    className?: string;
} & PropsWithChildren;
