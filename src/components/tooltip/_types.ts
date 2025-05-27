import { PropsWithChildren, ReactNode } from "react";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps extends PropsWithChildren {
    content: string | ReactNode;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
    contentClassName?: string;
    showArrow?: boolean;
    maxWidth?: string;
    disabled?: boolean;
    open?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}