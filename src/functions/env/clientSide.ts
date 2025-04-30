"use client";

import { boolean as baseBoolean, number as baseNumber, string as baseString } from "./base";

export function string(key: string, ...defaults: string[]): string {
    return baseString("NEXT_PUBLIC_", key, ...defaults);
}

export function number(key: string, ...defaults: number[]): number {
    return baseNumber("NEXT_PUBLIC_", key, ...defaults);
}

export function boolean(key: string, ...defaults: boolean[]): boolean {
    return baseBoolean("NEXT_PUBLIC_", key, ...defaults);
}
