import { TableProps } from "./_types";
import { twMerge } from "tailwind-merge";
import TableHeader from "./header";
import TableBody from "./body";

function Table<T extends object>({ data, config, className = "", onRowClick }: TableProps<T>) {
    return (
        <div className={twMerge("w-full")}>
            <table className={twMerge("min-w-full", className)}>
                <TableHeader config={config} />
                <TableBody data={data} config={config} onRowClick={onRowClick} />
            </table>
        </div>
    );
}

export default Table;
