"use client";

import { TableRowProps } from "./_types";
import { twMerge } from "tailwind-merge";

function TableRow<T>({ item, index, onRowClick, className, children }: TableRowProps<T>) {
    const handleClick = () => {
        if (onRowClick) {
            onRowClick(item, index);
        }
    };

    return (
        <tr
            onClick={handleClick}
            className={twMerge(onRowClick ? ["cursor-pointer"] : "", className)}>
            {children}
        </tr>
    );
}

export default TableRow;
