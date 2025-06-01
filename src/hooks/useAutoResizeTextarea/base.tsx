"use client";

import { useEffect, useRef } from "react";

function useAutoResizeTextarea(value: string) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    useEffect(() => {
        adjustHeight();
    }, []);

    return { textareaRef, adjustHeight };
}

export default useAutoResizeTextarea;
