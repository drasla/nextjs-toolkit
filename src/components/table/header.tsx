import { TableConfig } from "./_types";
import { twMerge } from "tailwind-merge";
import { getTextAlignClass, getTextColorClass } from "../func_style";

type Props<T> = {
    config: TableConfig<T>[];
};

function TableHeader<T>({ config }: Props<T>) {
    const baseClass = twMerge(["px-4", "py-2"], ["border-b", "theme-border"]);

    return (
        <thead>
            <tr>
                {config.map((column, index) => {
                    const align = column.headerAlign || column.align || "center";

                    return (
                        <th
                            key={index}
                            className={twMerge(
                                baseClass,
                                ["text-xs", "md:text-sm"],
                                column.disableMobile ? ["hidden", "md:table-cell"] : "",
                                column.width,
                                getTextAlignClass(align),
                                getTextColorClass(column.color),
                            )}>
                            {column.header}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;
