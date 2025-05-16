import { ButtonProps } from "./base";
import { forwardRef } from "react";

const ButtonServerSide = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, children, loading, ...props }, ref) => {
        return (
            <button ref={ref} disabled={loading} {...props}>
                {children}
            </button>
        );
    },
);

export default ButtonServerSide;
