import { TableProps } from "./_types";
import { twMerge } from "tailwind-merge";
import { getTextAlignClass, getTextColorClass } from "../functions";
import { Tooltip } from "../tooltip";

type Props<T> = {
    column: TableProps<T>["config"][0];
    value: any;
    item: T;
};

function TableCell<T>({ column, value, item }: Props<T>) {
    const tooltipContent =
        column.tooltip &&
        (typeof column.tooltip === "function" ? column.tooltip(item) : column.tooltip);
    const cellContent = column.render ? column.render(value, item) : String(value);

    const baseClass = twMerge(["px-4", "py-2"], ["border-b", "theme-border"]);
    const cellClass = twMerge(
        baseClass,
        column.disableMobile ? ["hidden", "md:table-cell"] : "",
        column.width,
        getTextAlignClass(column.align),
        getTextColorClass(column.color),
    );
    const contentClass = twMerge(column.ellipsis ? ["truncate", "max-w-full"] : "");

    return (
        <td className={cellClass}>
            <div className={contentClass}>
                {tooltipContent ? (
                    <Tooltip content={tooltipContent}>
                        <span>{cellContent}</span>
                    </Tooltip>
                ) : (
                    cellContent
                )}
            </div>
        </td>
    );
}

export default TableCell;
