import { THEME_COLOR } from "../../index";

export function getTextAlignClass(align?: "left" | "center" | "right"): string {
    switch (align) {
        case "center":
            return "text-center";
        case "right":
            return "text-right";
        case "left":
            return "text-left";
        default:
            return "";
    }
}

export function getTextColorClass(color?: THEME_COLOR) {
    switch (color) {
        case "primary":
            return "text-primary-main";
        case "secondary":
            return "text-secondary-main";
        case "success":
            return "text-success-main";
        case "warning":
            return "text-warning-main";
        case "error":
            return "text-error-main";
        case "info":
            return "text-info-main";
        case "disabled":
            return "text-disabled-main";
        default:
            return "";
    }
}
