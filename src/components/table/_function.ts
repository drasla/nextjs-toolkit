import { THEME_COLOR } from "../../types";
import { ReactNode } from "react";
import { NestedKeyOf, NestedValueType, TableConfig } from "./_types";

export function createTableConfig<T, K extends NestedKeyOf<T>>(config: {
    header: string;
    key: K;
    width?: string;
    color?: THEME_COLOR;
    align?: "left" | "right" | "center";
    headerAlign?: "left" | "right" | "center";
    bodyAlign?: "left" | "right" | "center";
    tooltip?: string | ((item: T) => string);
    disableMobile?: boolean;
    render?: (value: NestedValueType<T, K>, item: T) => ReactNode;
    ellipsis?: boolean;
}): TableConfig<T> {
    return config as TableConfig<T>;
}