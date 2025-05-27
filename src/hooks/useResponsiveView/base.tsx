"use client";

import { useEffect, useState } from "react";

function useResponsiveView(): boolean {
    const [showCompact, setShowCompact] = useState(false);

    useEffect(() => {
        const handler = () => {
            setShowCompact(window.innerWidth < 768);
        };
        handler();
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return showCompact;
}

export default useResponsiveView;
