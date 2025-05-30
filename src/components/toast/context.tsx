"use client";

import { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getBackgroundColorClass } from "../func_style";
import { THEME_COLOR } from "../../types";

const ToastContext = createContext<(msg: string) => void>(() => {});

export type ToastType = {
    id: string;
    color: THEME_COLOR;
    message: string;
};

export const ToastProvider = () => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = (message: string, color: THEME_COLOR = "primary") => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, color }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={showToast}>
            <div className={twMerge(["fixed", "bottom-4", "right-4", "space-y-2", "z-50"])}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={twMerge(
                            ["px-4", "py-2", "rounded-md"],
                            getBackgroundColorClass(toast.color),
                        )}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
