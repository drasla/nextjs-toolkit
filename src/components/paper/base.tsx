import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    isPadding?: boolean;
    className?: string;
} & PropsWithChildren;

function Paper({ children, isPadding = true, className }: Props) {
    return (
        <div
            className={twMerge(["theme-paper", "rounded-xl"], isPadding ? ["p-4"] : "", className)}>
            {children}
        </div>
    );
}

export default Paper;
