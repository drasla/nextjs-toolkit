import { THEME_COLOR } from "@drasla/nextjs-toolkit";

export type EnumMeta<T extends string> = {
    label: string;
    color: THEME_COLOR;
};

export type EnumMetaMap<T extends string> = Record<T, EnumMeta<T>>;

export function createEnumMetaMap<T extends string>(metaMap: EnumMetaMap<T>) {
    return function getMeta(meta: T): EnumMeta<T> {
        return (
            metaMap[meta] ?? {
                label: "알 수 없음",
                color: "disabled",
            }
        );
    };
}