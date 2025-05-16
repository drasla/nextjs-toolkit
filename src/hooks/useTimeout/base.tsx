"use client";

import { useCallback, useEffect, useState } from "react";

export function useTimeout() {
    const [timeouts, setTimeouts] = useState<Record<string, NodeJS.Timeout>>({});

    const clearTimeoutByKey = useCallback(
        (key: string) => {
            if (timeouts[key]) {
                clearTimeout(timeouts[key]);
                setTimeouts(prev => {
                    const newTimeouts = { ...prev };
                    delete newTimeouts[key];
                    return newTimeouts;
                });
            }
        },
        [timeouts],
    );

    const clearAllTimeouts = useCallback(() => {
        Object.values(timeouts).forEach(id => clearTimeout(id));
        setTimeouts({});
    }, [timeouts]);

    const setTimeout = useCallback(
        (key: string, callback: () => void, delay: number) => {
            clearTimeoutByKey(key);
            const id = global.setTimeout(callback, delay);
            setTimeouts(prev => ({ ...prev, [key]: id }));
            return id;
        },
        [clearTimeoutByKey],
    );

    useEffect(() => {
        return clearAllTimeouts;
    }, [clearAllTimeouts]);

    return { setTimeout, clearTimeoutByKey, clearAllTimeouts };
}
