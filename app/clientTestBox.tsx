"use client";

import { useState } from "react";
import { StepperStep } from "../src/components/stepper/base";
import { Pagination, Stepper } from "../src";
import { SearchParams } from "next/dist/server/request/search-params";
import { useSearchParams } from "next/navigation";

const steps: StepperStep[] = [
    { label: "배송지 정보", optional: true, optionalLabel: "선택 사항" },
    { label: "결제 정보" },
    { label: "주문 확인" },
];

function ClientTestBox() {
    const [activeStep, setActiveStep] = useState(0);
    const searchParams = useSearchParams();

    const handleNext = () => {
        setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
    };

    const handleBack = () => {
        setActiveStep(prevStep => Math.max(prevStep - 1, 0));
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <Pagination
                page={Number(searchParams.get("page")) || 1}
                size={10}
                total={88900}
                variant="square"
            />

            <Stepper steps={steps} activeStep={activeStep} />

            <div className="mt-8">
                {activeStep === steps.length - 1 ? (
                    <div className="text-center">
                        <p className="mb-4">모든 단계가 완료되었습니다!</p>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            처음으로 돌아가기
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between">
                        <button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={`px-4 py-2 rounded-md ${
                                activeStep === 0
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 text-gray-700"
                            }`}>
                            이전
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            다음
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClientTestBox;
