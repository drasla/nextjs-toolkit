import { TableProps } from "./_types";
import { twMerge } from "tailwind-merge";
import TableHeader from "./header";
import TableBody from "./body";
import TableBodyEmpty from "./body_empty";

function Table<T extends object>({ data = [], config, className = "", onRowClick }: TableProps<T>) {
    const isEmpty = !data || data.length === 0;

    return (
        <div className={twMerge("w-full")}>
            <table className={twMerge("min-w-full", className)}>
                <TableHeader config={config} />
                {isEmpty ? (
                    <TableBodyEmpty config={config} />
                ) : (
                    <TableBody data={data} config={config} onRowClick={onRowClick} />
                )}
            </table>
        </div>
    );
}

export default Table;
