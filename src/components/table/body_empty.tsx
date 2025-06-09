import { TableConfig } from "./_types";
import { twMerge } from "tailwind-merge";

type Props<T> = {
    config: TableConfig<T>[];
};

function TableBodyEmpty<T>({ config }: Props<T>) {
    return (
        <tbody>
            <tr>
                <td
                    colSpan={config.length}
                    className={twMerge(
                        ["h-40", "align-middle"],
                        ["text-center", "text-disabled-main"],
                    )}>
                    데이터가 존재하지 않습니다.
                </td>
            </tr>
        </tbody>
    );
}

export default TableBodyEmpty;
