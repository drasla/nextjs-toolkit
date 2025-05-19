import { THEME_COLOR } from "../index";

const validColorStyle: THEME_COLOR[] = [
    "primary",
    "secondary",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
];

export const getColor = (color: THEME_COLOR | string): string => {
    if (validColorStyle.includes(color as THEME_COLOR)) {
        return `var(--color-${color}-main)`;
    }
    return color;
};
