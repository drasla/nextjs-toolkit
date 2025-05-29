"use client";

import { useState } from "react";
import CloseModal, { CloseModalProps } from "./closeModal";
import { Modal } from "./base";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";

type ConfirmModalProps = {
    open: boolean;
    onClose: VoidFunction;
    title?: string;
    description?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: () =>
        | Promise<{ success: boolean; message?: string }>
        | { success: boolean; message?: string };
    successTitle?: string;
    errorTitle?: string;
    onSuccessClose?: VoidFunction;
    onErrorClose?: VoidFunction;
    onAfterClose?: VoidFunction;
};

function ConfirmModal({
    open,
    onClose,
    title,
    description,
    confirmButtonText = "확인",
    cancelButtonText = "취소",
    onConfirm,
    successTitle,
    errorTitle = "오류가 발생했습니다",
    onSuccessClose,
    onErrorClose,
    onAfterClose,
}: ConfirmModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showStatus, setShowStatus] = useState<Pick<
        CloseModalProps,
        "type" | "title" | "description"
    > | null>(null);

    const handleConfirm = async () => {
        setIsLoading(true);

        try {
            const result = await onConfirm();

            if (result.success) {
                setShowStatus({
                    type: "success",
                    title: successTitle,
                    description: result.message,
                });
            } else {
                setShowStatus({
                    type: "error",
                    title: errorTitle,
                    description: result.message,
                });
            }
        } catch (error) {
            setShowStatus({
                type: "error",
                title: errorTitle,
                description: "예상치 못한 오류가 발생했습니다.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusClose = () => {
        const statusType = showStatus?.type;

        setShowStatus(null);
        onClose();

        if (statusType === "success" && onSuccessClose) {
            onSuccessClose();
        } else if (statusType === "error" && onErrorClose) {
            onErrorClose();
        }

        if (onAfterClose) {
            onAfterClose();
        }
    };

    if (showStatus) {
        return (
            <CloseModal
                onClose={handleStatusClose}
                open={open}
                type={showStatus.type}
                title={showStatus.title}
                description={showStatus.description}
            />
        );
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className={twMerge(["p-6"], ["flex", "flex-col", "space-y-4"], ["text-center"])}>
                {title && <h2 className={twMerge(["text-xl", "font-semibold"])}>{title}</h2>}
                {description && <p className={twMerge(["text-sm", "max-w-sm"])}>{description}</p>}
                <div className={twMerge(["flex", "justify-end", "space-x-3"], ["pt-4"])}>
                    <Button onClick={onClose} color={"warning"} disabled={isLoading}>
                        {cancelButtonText}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        color={"success"}
                        disabled={isLoading}
                        loading={isLoading}>
                        {confirmButtonText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
