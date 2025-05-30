import { ChipProps } from "./_types";
import { twMerge } from "tailwind-merge";
import { getBackgroundColorClass, getTextContrastColorClass } from "../func_style";

function Chip<T extends string>({ meta, getMeta, className }: ChipProps<T>) {
    const { label, color } = getMeta(meta);

    const classes = twMerge(
        ["px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium"],
        ["inline-flex", "items-center"],
        getBackgroundColorClass(color),
        getTextContrastColorClass(color),
        className,
    );

    return <span className={classes}>{label}</span>;
}

export default Chip;
