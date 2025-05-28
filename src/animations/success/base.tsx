import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { TbCheck } from "react-icons/tb";
import { getColor } from "../base";
import { THEME_COLOR } from "../../types";

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

    const animationStyle = `
    .draw-svg {
        overflow: visible;

        &.loop {
            .draw-circle, .inner-circle, .outer-circle, .check-svg {
                animation-iteration-count: infinite;
                animation-duration: 2s;
                animation-fill-mode: forwards;
            }
        }
    }

    .draw-circle {
        fill: transparent;
        stroke-dasharray: 314; /* 원의 둘레 (2π × 50 ≒ 314) */
        stroke-dashoffset: 314;
        animation: draw-circle 2s forwards;
    }

    @keyframes draw-circle {
        0% {
            stroke-dashoffset: 314;
        }
        25% {
            stroke-dashoffset: 0;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    .inner-circle {
        transform: scale(0);
        transform-origin: 60px 60px;
        animation: fill-circle 2s forwards;
    }

    @keyframes fill-circle {
        0% {
            transform: scale(0);
        }
        25% {
            transform: scale(0);
        }
        40% {
            transform: scale(1.2);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(1);
        }
    }

    .outer-circle {
        opacity: 0;
        transform: scale(1);
        transform-origin: 60px 60px;
        animation: opacity-circle 2s forwards;
    }

    @keyframes opacity-circle {
        0% {
            opacity: 0;
            transform: scale(1);
        }

        49.99% {
            opacity: 0;
        }

        50% {
            opacity: 1;
            transform: scale(1);
        }
        75% {
            opacity: 0;
            transform: scale(1.4);
        }

        100% {
            opacity: 0;
            transform: scale(1.4);
        }
    }

    .check-svg {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        color: #FFFFFF;
        clip-path: inset(0 100% 0 0);
        animation: show-image 2s forwards;
    }

    .check-svg img {
        width: 50%;
        height: 50%;
        color: white;
        filter: brightness(0) invert(1);
    }

    @keyframes show-image {
        0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
        }

        50% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
        }

        100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
        }
    }
    `;

    return (
        <>
            <style>{animationStyle}</style>
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
                            <TbCheck size={(width / 5) * 3} />
                        </div>
                    </foreignObject>
                </svg>
            </div>
        </>
    );
}
