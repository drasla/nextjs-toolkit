import { PropsWithChildren, ReactNode } from "react";
import { THEME_COLOR } from "../../index";

export type TableRowClickHandler<T> = (item: T, index: number) => void;

export type TableColumnConfig<T> = {
    header: string;
    key: keyof T;
    width?: string;
    color?: THEME_COLOR;
    align?: "left" | "right" | "center";
    tooltip?: string | ((item: T) => string);
    disableMobile?: boolean;
    render?: (value: T[keyof T], item: T) => ReactNode;
    ellipsis?: boolean;
};

export type TableProps<T> = {
    data: T[];
    columns: TableColumnConfig<T>[];
    className?: string;
    onRowClick?: TableRowClickHandler<T>;
};

export type TableRowProps<T> = {
    item: T;
    index: number;
    onRowClick?: TableRowClickHandler<T>;
    className?: string;
} & PropsWithChildren;
