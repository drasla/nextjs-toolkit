import { THEME_COLOR } from "../types";

const validColorStyle: THEME_COLOR[] = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "error",
    "disabled",
];

export const getColor = (color: THEME_COLOR | string): string => {
    if (validColorStyle.includes(color as THEME_COLOR)) {
        return `var(--color-${color}-main)`;
    }
    return color;
};
