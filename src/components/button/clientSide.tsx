"use client";

import { ButtonProps } from "./base";
import { forwardRef } from "react";

const ButtonClientSide = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, children, ...props }, ref) => {
        return (
            <button ref={ref} onClick={onClick} {...props}>
                {children}
            </button>
        );
    },
);

export default ButtonClientSide;
