import { randomUUID } from "crypto";
import { pbkdf2Sync } from "pbkdf2";

export function salting(salt: string, password: string): string {
    return pbkdf2Sync(password, salt, 50, 32, "sha512").toString();
}

export function createSalt(): string {
    return randomUUID();
}
