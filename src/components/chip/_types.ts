import { THEME_COLOR } from "../../types";

export type ChipProps<T extends string> = {
    meta: T;
    getMeta: (meta: T) => { label: string; color: THEME_COLOR };
    className?: string;
};