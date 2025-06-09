async function getParams<T extends Record<string, string | string[] | undefined>>(
    params: Promise<T>,
): Promise<{ [K in keyof T]-?: NonNullable<T[K]> }> {
    const resolved = await params;
    const result = {} as any;

    for (const key in resolved) {
        const value = resolved[key];
        if (value === undefined) {
            throw new Error(`Missing parameter: ${key}`);
        }
        result[key] = value;
    }

    return result;
}

export default getParams;
