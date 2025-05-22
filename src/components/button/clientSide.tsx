"use client";

import { forwardRef, ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonClientProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const ButtonClient = forwardRef<HTMLButtonElement, ButtonClientProps>((props, ref) => {
    return (
        <button ref={ref} {...props}>
            {props.children}
        </button>
    );
});

ButtonClient.displayName = "ButtonClient";

export default ButtonClient;
