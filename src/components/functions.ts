import { THEME_COLOR, THEME_SIZE } from "../index";
import { twMerge } from "tailwind-merge";

export function getComponentSizeClass(size?: THEME_SIZE): string {
    switch (size) {
        case "large":
            return twMerge("py-3", "px-4", "text-lg");
        case "small":
            return twMerge("py-1", "px-4", "text-sm");
        default:
            return twMerge("py-2", "px-4", "text-base");
    }
}

export function getThemeColorBackground(color?: THEME_COLOR): string {
    return `bg-${color}-main`;
}
