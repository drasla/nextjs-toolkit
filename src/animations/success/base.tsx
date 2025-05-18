import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { THEME_COLOR } from "../../index";
import { TbCheck } from "react-icons/tb";
import "./animation.css";

type Props = {
    className?: string;
    width?: number;
    height?: number;
    stroke?: number;
    color?: THEME_COLOR | string;
    loop?: boolean;
};

export function SuccessAnimation({
    className,
    width = 120,
    height = 120,
    stroke = 6,
    color = "success",
    loop = false,
}: Props) {
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) / 2 - 10;

    const animationCssWrapper = loop ? "draw-svg loop" : "draw-svg";
    const computedColor = getColor(color);

    return (
        <div className={twMerge(animationCssWrapper, className)}>
            <svg
                className={"draw-svg"}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ "--cx": cx, "--cy": cy, "--r": r } as CSSProperties}>
                <circle
                    className={"inner-circle"}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={computedColor}
                    strokeWidth="none"
                />
                <circle
                    className={"outer-circle"}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={computedColor}
                    strokeWidth="none"
                />
                <circle
                    className="draw-circle"
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={computedColor}
                    strokeWidth={stroke}
                />
                <foreignObject x={0} y={0} width={width} height={height}>
                    <div className={"check-svg"}>
                        <TbCheck size={width / 5 * 3}/>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}

const validColorStyle: THEME_COLOR[] = [
    "primary",
    "secondary",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
];

const getColor = (color: THEME_COLOR | string): string => {
    if (validColorStyle.includes(color as THEME_COLOR)) {
        return `var(--color-${color}-main)`;
    }
    return color;
};
