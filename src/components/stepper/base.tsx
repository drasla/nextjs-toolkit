import { twMerge } from "tailwind-merge";
import { TbCheck } from "react-icons/tb";

export type StepperStep = {
    label: string;
    optional?: boolean;
    optionalLabel?: string;
};

export type StepperProps = {
    steps: StepperStep[];
    activeStep: number;
    className?: string;
};

function Stepper({ steps, activeStep, className }: StepperProps) {
    /* TODO: 모바일용 Stepper 레이아웃도 만들어야 함 */
    return (
        <div className={twMerge("flex", "w-full", className)}>
            {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isCurrent = index === activeStep;
                const isLast = index === steps.length - 1;

                return (
                    <div
                        key={index}
                        className={twMerge(
                            ["relative"],
                            ["flex-1", "flex", "flex-col", "items-center"],
                        )}>
                        {!isLast && (
                            <div className={twMerge(["absolute", "top-4", "w-full", "left-1/2"])}>
                                <div
                                    className={twMerge([
                                        "flex",
                                        "justify-center",
                                        "w-full",
                                        "px-8",
                                    ])}>
                                    <div
                                        className={twMerge(
                                            ["h-px", "w-full"],
                                            isCompleted
                                                ? "bg-primary-main"
                                                : ["bg-light-divider", "bg-dark-divider"],
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className={twMerge(
                                ["w-8", "h-8", "z-10"],
                                ["flex", "justify-center", "items-center"],
                                ["text-sm", "font-bold"],
                                ["rounded-full"],
                                isCompleted
                                    ? ["bg-primary-main", "text-white"]
                                    : isCurrent
                                      ? ["bg-primary-main", "text-white"]
                                      : ["bg-light-divider", "dark:bg-dark-divider"],
                            )}>
                            {isCompleted ? <TbCheck /> : <>{index + 1}</>}
                        </div>
                        <div className={twMerge(["mt-2", "text-center"])}>
                            <div
                                className={twMerge(
                                    ["text-sm", "font-bold"],
                                    isCurrent
                                        ? "text-primary-main"
                                        : ["text-disabled-dark", "dark:text-disabled-light"],
                                )}>
                                {step.label}
                            </div>
                            {step.optional && (
                                <div
                                    className={twMerge([
                                        "text-xs",
                                        "text-disabled-dark",
                                        "dark:text-disabled-light",
                                        "mt-0.5",
                                    ])}>
                                    {step.optionalLabel}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Stepper;
