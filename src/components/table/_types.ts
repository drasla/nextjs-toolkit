import { PropsWithChildren, ReactNode } from "react";
import { THEME_COLOR } from "../../types";

export type NestedKeyOf<T> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
}[keyof T & (string | number)];

export type NestedValueType<T, K extends string> = K extends keyof T
    ? T[K]
    : K extends `${infer F}.${infer R}`
      ? F extends keyof T
          ? T[F] extends object
              ? NestedValueType<T[F], R>
              : never
          : never
      : never;

export function getNestedValue<T, K extends string>(obj: T, key: K): any {
    return key.split(".").reduce((o, k) => (o as any)?.[k], obj);
}

export type TableRowClickHandler<T> = (item: T, index: number) => void;

export type TableConfig<T> = {
    header: string;
    key: NestedKeyOf<T>;
    width?: string;
    color?: THEME_COLOR;
    align?: "left" | "right" | "center";
    headerAlign?: "left" | "right" | "center";
    bodyAlign?: "left" | "right" | "center";
    tooltip?: ((item: T) => string);
    disableMobile?: boolean;
    render?: (value: any, item: T) => ReactNode;
    ellipsis?: boolean;
};

export type TableProps<T> = {
    data?: T[];
    config: TableConfig<T>[];
    className?: string;
    onRowClick?: TableRowClickHandler<T>;
};

export type TableRowProps<T> = {
    item: T;
    index: number;
    onRowClick?: TableRowClickHandler<T>;
    className?: string;
} & PropsWithChildren;
