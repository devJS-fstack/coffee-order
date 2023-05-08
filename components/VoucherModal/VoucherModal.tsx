import { Modal } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import Scrollbars from "react-custom-scrollbars";

const VoucherModal = ({ 
    isOpen,
    setIsOpen,
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}) => {
    const handleOk = () => {
        setIsOpen(false);
      };
    
    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            title="Available Voucher"
            open={isOpen} onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" } }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
            >
                <Scrollbars autoHide style={{ height: 500 }}>
                    <div className="mb-3 tch-delivery__input flex items-center w-full relative flex-wrap">
                    </div>
                </Scrollbars>
        </Modal>
    )
}

export default VoucherModal;