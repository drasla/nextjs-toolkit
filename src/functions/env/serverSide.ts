"use server";

import { boolean as baseBoolean, number as baseNumber, string as baseString } from "./base";

export async function string(key: string, ...defaults: string[]): Promise<string> {
    return baseString("", key, ...defaults);
}

export async function number(key: string, ...defaults: number[]): Promise<number> {
    return baseNumber("", key, ...defaults);
}

export async function boolean(key: string, ...defaults: boolean[]): Promise<boolean> {
    return baseBoolean("", key, ...defaults);
}
