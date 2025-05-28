import { OptionProps } from "./_types";
import { useContext } from "react";
import { SelectContext } from "./context";
import { twMerge } from "tailwind-merge";

function Option({ value, className, children }: OptionProps) {
    const { onChange, selectedValue } = useContext(SelectContext);

    const isSelected = selectedValue === value;

    const handleClick = () => {
        onChange(value);
    };

    return (
        <div
            onClick={handleClick}
            className={twMerge(
                ["px-4", "py-2", "cursor-pointer", "transition-colors"],
                ["hover:bg-disabled-light", "active:bg-disabled-main"],
                isSelected && ["bg-primary-light", "text-primary-main"],
                className,
            )}>
            {children}
        </div>
    );
}

export default Option;
