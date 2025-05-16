const ERR_NO_ENV_VALUE = "no_env_value";
const ERR_INVALID_NUMBER_ENV_VALUE = "invalid_number_env_value";
const ERR_INVALID_VALUE = "invalid_env_value";

type ValueConverter<T> = {
    convert: (value: string) => T;
    validate?: (value: string) => boolean;
    errorType?: string;
};

function getEnvValue<T>(
    prefix: string,
    key: string,
    converter: ValueConverter<T>,
    ...defaults: T[]
) {
    const v = getValue(prefix, key);
    if (!v) {
        if (defaults.length > 0) return defaults[0];
        throw new Error(`${ERR_NO_ENV_VALUE}: key=${key}`);
    }

    if (converter.validate && !converter.validate(v)) {
        throw new Error(`${converter.errorType || ERR_INVALID_VALUE}: key=${key}`);
    }

    return converter.convert(v);
}

export function string(prefix: string, key: string, ...defaults: string[]): string {
    return getEnvValue(prefix, key, { convert: v => v }, ...defaults);
}

export function number(prefix: string, key: string, ...defaults: number[]): number {
    return getEnvValue(
        prefix,
        key,
        {
            convert: v => Number(v),
            validate: v => !Number.isNaN(Number(v)),
            errorType: ERR_INVALID_NUMBER_ENV_VALUE,
        },
        ...defaults,
    );
}

export function boolean(prefix: string, key: string, ...defaults: boolean[]): boolean {
    return getEnvValue(
        prefix,
        key,
        {
            convert: v => v === "true",
        },
        ...defaults,
    );
}

function getValue(prefix: string, key: string): string {
    if (prefix) {
        const envKey = `${prefix}_${key}`;
        return process.env[envKey] || "";
    }
    return process.env[key] || "";
}
