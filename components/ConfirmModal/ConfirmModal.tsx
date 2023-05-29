import { ButtonProps, Divider, Modal } from "antd";

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string;
    time: string;
}

const ConfirmModal = ({
    isOpen,
    handleOk,
    handleCancel,
    title,
    children,
    okText,
    okButtonProps,
}: {
    isOpen: boolean;
    handleOk: (...args: any) => Promise<void>;
    handleCancel: () => void;
    title: string;
    children?: any;
    okText?: string;
    okButtonProps?: ButtonProps;
}) => {
    return (
        <Modal
            title={title}
            open={isOpen}
            onOk={handleOk}
            okText={okText || "Ok"}
            onCancel={handleCancel}
            okButtonProps={{
                style: { backgroundColor: "var(--orange-4)" },
                ...okButtonProps,
            }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
        >
            {children}
        </Modal>
    );
};

export default ConfirmModal;
