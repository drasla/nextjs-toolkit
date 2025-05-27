import { getNestedValue, TableConfig } from "./_types";
import TableCell from "./cell";
import TableRow from "./row";

type Props<T> = {
    data: T[];
    config: TableConfig<T>[];
    onRowClick?: (item: T, index: number) => void;
};

function TableBody<T>({ data, config, onRowClick }: Props<T>) {
    return (
        <tbody>
            {data.map((item, rowIndex) => {
                const tableCells = config.map((column, colIndex) => {
                    const value = getNestedValue(item, column.key);
                    return <TableCell key={colIndex} column={column} value={value} item={item} />;
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
    );
}

export default TableBody;
