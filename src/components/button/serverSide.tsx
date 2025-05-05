import { ButtonProps } from "./base";
import { forwardRef } from "react";

const ButtonServerSide = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, children, ...props }, ref) => {
        return (
            <button ref={ref} {...props}>
                {children}
            </button>
        );
    },
);

export default ButtonServerSide;
