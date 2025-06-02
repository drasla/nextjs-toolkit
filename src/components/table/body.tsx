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
            {data.length === 0 ? (
                <tr>
                    <td colSpan={config.length} className="px-4 py-8 text-center text-gray-500">
                        데이터가 존재하지 않습니다.
                    </td>
                </tr>
            ) : (
                data.map((item, rowIndex) => {
                    const tableCells = config.map((column, colIndex) => {
                        const value = getNestedValue(item, column.key);
                        return (
                            <TableCell key={colIndex} column={column} value={value} item={item} />
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
                })
            )}
        </tbody>
    );
}

export default TableBody;
