import { getNestedValue, TableProps } from "./_types";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "../tooltip";
import { getTextAlignClass, getTextColorClass } from "./_utils";
import TableRow from "./row";

function Table<T extends object>({ data, config, className = "", onRowClick }: TableProps<T>) {
    return (
        <div className={twMerge("w-full")}>
            <div className={"overflow-x-auto"}>
                <table className={twMerge("min-w-full", className)}>
                    <thead>
                        <tr>
                            {config.map((column, index) => (
                                <th
                                    key={index}
                                    className={twMerge(
                                        ["px-4", "py-2"],
                                        ["border-b", "theme-border"],
                                        ["text-xs", "md:text-sm"],
                                        column.disableMobile ? ["hidden", "md:table-cell"] : "",
                                        column.width,
                                        getTextAlignClass(column.align),
                                        getTextColorClass(column.color),
                                    )}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => {
                            const tableCells = config.map((column, colIndex) => {
                                const value = getNestedValue(item, column.key);
                                const tooltipContent =
                                    column.tooltip && typeof column.tooltip === "function"
                                        ? column.tooltip(item)
                                        : column.tooltip;

                                const cellContent = column.render
                                    ? column.render(value, item)
                                    : String(value);

                                return (
                                    <td
                                        key={colIndex}
                                        className={twMerge(
                                            ["px-4", "py-2"],
                                            ["border-b", "theme-border"],
                                            column.disableMobile ? ["hidden", "md:table-cell"] : "",
                                            column.width,
                                            getTextAlignClass(column.align),
                                            getTextColorClass(column.color),
                                        )}>
                                        {tooltipContent ? (
                                            <div
                                                className={twMerge(
                                                    column.ellipsis
                                                        ? ["truncate", "max-w-full"]
                                                        : "",
                                                )}>
                                                <Tooltip content={tooltipContent}>
                                                    <span>{cellContent}</span>
                                                </Tooltip>
                                            </div>
                                        ) : (
                                            <div
                                                className={twMerge(
                                                    column.ellipsis
                                                        ? ["truncate", "max-w-full"]
                                                        : "",
                                                )}>
                                                {cellContent}
                                            </div>
                                        )}
                                    </td>
                                );
                            });

                            return onRowClick ? (
                                <TableRow<T>
                                    key={rowIndex}
                                    item={item}
                                    index={rowIndex}
                                    onRowClick={onRowClick}>
                                    {tableCells}
                                </TableRow>
                            ) : (
                                <tr key={rowIndex}>{tableCells}</tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
