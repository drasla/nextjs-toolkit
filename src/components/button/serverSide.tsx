import { forwardRef, ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonServerProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const ButtonServerSide = forwardRef<HTMLButtonElement, ButtonServerProps>((props, ref) => {
    return (
        <button ref={ref} {...props}>
            {props.children}
        </button>
    );
});

ButtonServerSide.displayName = 'ButtonServerSide';

export default ButtonServerSide;
