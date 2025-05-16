"use client";

import { ButtonProps } from "./base";
import { forwardRef } from "react";

const ButtonClientSide = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, children, loading, ...props }, ref) => {
        return (
            <button ref={ref} onClick={onClick} disabled={loading} {...props}>
                {children}
            </button>
        );
    },
);

export default ButtonClientSide;
