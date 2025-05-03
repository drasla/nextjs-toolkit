function twMerge(...className: (string | string[] | undefined | null | false)[]): string {
    const flattenedClasses = className.reduce<string[]>((acc, curr) => {
        if (!curr) return acc;

        if (typeof curr === 'string') {
            acc.push(curr);
        } else if (Array.isArray(curr)) {
            // 배열인 경우 각 항목을 acc에 추가
            acc.push(...curr.filter(Boolean));
        }

        return acc;
    }, []);

    const allClasses = flattenedClasses.join(" ").split(/\s+/).filter(Boolean);

    const result: Record<string, string> = {};

    for (const c of allClasses) {
        const match = c.match(/^((?:[a-z0-9]+:)?[a-z0-9-]+(?:\/[a-z0-9-]+)*)/i);
        const key = match?.[1];

        if (key) {
            const baseProperty = key.replace(/^(?:[a-z0-9]+:)?([a-z0-9-]+).*$/i, '$1');
            result[baseProperty] = c;
        } else {
            result[c] = c;
        }
    }

    return Object.values(result).join(" ");
}

export default twMerge;
