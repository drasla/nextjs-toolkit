"use client";

import { MouseEvent, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { THEME_COLOR } from "../../index";

function useRipple<T extends HTMLElement>(color?: THEME_COLOR) {
    const containerRef = useRef<T>(null);

    function createRipple(e: MouseEvent) {
        const container = containerRef.current;
        if (!container) return;

        const circle = document.createElement("span");
        const diameter = Math.max(container.clientWidth, container.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - container.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - container.getBoundingClientRect().top - radius}px`;
        circle.className = twMerge("ripple", getColorClass(color));

        const ripple = container.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        container.appendChild(circle);
    }

    return { containerRef, createRipple };
}

export default useRipple;

const getColorClass = (color?: THEME_COLOR) => {
    switch (color) {
        case "primary":
            return "bg-primary-dark";
        case "secondary":
            return "bg-secondary-dark";
        case "success":
            return "bg-success-dark";
        case "warning":
            return "bg-warning-dark";
        case "error":
            return "bg-error-dark";
        case "info":
            return "bg-info-dark";
        default:
            return "bg-black";
    }
};
