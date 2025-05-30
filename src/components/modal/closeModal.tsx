"use client";

import { Modal } from "./base";
import { twMerge } from "tailwind-merge";
import { ErrorAnimation, SuccessAnimation } from "../../animations";
import { Button } from "../button";

export type CloseModalProps = {
    open: boolean;
    onClose: VoidFunction;
    type: "success" | "error";
    title?: string;
    description?: string;
    closeButtonText?: string;
};

function CloseModal({
    open,
    onClose,
    type,
    title,
    description,
    closeButtonText = "닫기",
}: CloseModalProps) {
    return (
        <Modal onClose={onClose} open={open}>
            <div className={twMerge(["p-6"], ["flex", "flex-col", "space-y-4"], ["text-center"])}>
                <div className={twMerge("mb-4", ["flex", "justify-center"])}>
                    {type === "success" ? (
                        <SuccessAnimation width={120} height={120} />
                    ) : (
                        <ErrorAnimation width={120} height={120} />
                    )}
                </div>

                {title && <h2 className={twMerge(["text-xl", "font-semibold"])}>{title}</h2>}

                {description && <p className={twMerge(["text-sm", "max-w-sm"])}>{description}</p>}

                <div className={twMerge("pt-4")}>
                    <Button onClick={onClose} color={"primary"} className={twMerge("min-w-25")}>
                        {closeButtonText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CloseModal;

export function SuccessModal(props: Omit<CloseModalProps, "type">) {
    return <CloseModal type={"success"} {...props} />;
}

export function ErrorModal(props: Omit<CloseModalProps, "type">) {
    return <CloseModal type={"error"} {...props} />;
}
