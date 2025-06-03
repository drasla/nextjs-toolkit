import { TableProps } from "./_types";
import { twMerge } from "tailwind-merge";
import { getFlexJustifyClass, getTextAlignClass, getTextColorClass } from "../func_style";
import { Tooltip } from "../tooltip";

type Props<T> = {
    column: TableProps<T>["config"][0];
    value: any;
    item: T;
};

function TableCell<T>({ column, value, item }: Props<T>) {
    const tooltipContent = column.tooltip ? column.tooltip(item) : undefined;
    const cellContent = column.render ? column.render(value, item) : String(value);
    const cellAlign = column.bodyAlign || column.align || "left";

    const needsWrapper = column.ellipsis || tooltipContent;

    const baseClass = twMerge(
        ["p-2", "min-h-12", "align-middle"],
        ["border-b", "theme-border"],
    );
    const cellClass = twMerge(
        baseClass,
        column.disableMobile ? ["hidden", "md:table-cell"] : "",
        column.width,
        getTextAlignClass(cellAlign),
        getTextColorClass(column.color),
        column.ellipsis ? "max-w-0" : "",
    );
    const contentClass = twMerge(
        ["min-h-7.5", "flex", "items-center", "w-full"],
        getFlexJustifyClass(cellAlign),
        column.ellipsis ? ["min-w-0"] : "",
    );

    const content = tooltipContent ? (
        <Tooltip
            content={tooltipContent}
            position="bottom"
            delay={100}
            className={twMerge("w-full")}
        >
            <div className={twMerge(column.ellipsis ? ["truncate", "w-full"] : "")}>
                {cellContent}
            </div>
        </Tooltip>
    ) : (
        <span className={twMerge(column.ellipsis ? ["truncate", "block", "w-full"] : "")}>
            {cellContent}
        </span>
    );

    return (
        <td className={cellClass}>
            {needsWrapper ? <div className={contentClass}>{content}</div> : cellContent}
        </td>
    );
}

export default TableCell;
