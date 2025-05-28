import { ChipProps } from "./_types";
import { twMerge } from "tailwind-merge";
import { getBackgroundColorClass, getTextContrastColorClass } from "../functions";

function Chip<T extends string>({ meta, getMeta, className }: ChipProps<T>) {
    const { label, color } = getMeta(meta);

    const classes = twMerge(
        ["px-2.5", "py-0.5", "rounded-full", "text-sm", "font-medium"],
        ["flex", "items-center"],
        getBackgroundColorClass(color),
        getTextContrastColorClass(color),
        className,
    );

    return <span className={classes}>{label}</span>;
}

export default Chip;