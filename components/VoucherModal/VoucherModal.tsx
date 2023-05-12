import { Button, Modal } from "antd";
import { Input } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import Scrollbars from "react-custom-scrollbars";
import VoucherBody from "./VoucherBody";
import VoucherDetail from "./VoucherDetail";


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
    const [step, setStep] = useState({
        step: 1,
        header: "Promos",
        buttons: [
            <Button onClick={handleCancel} style={{ backgroundColor: "transparent" }} key="CANCEL">
                Cancel
            </Button>
        ],
        heightModal: "500px"
    });

    return (
        <Modal
            title={step.header}
            open={isOpen} onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" }}}
            footer={step.buttons}
            >
                <Scrollbars autoHide style={{ height: step.heightModal, overflowX: "hidden" }}>
                    {
                        step.step === 1 ? <VoucherBody setStep={setStep} setIsOpen={setIsOpen}/> : <VoucherDetail/>
                    }
                </Scrollbars>
        </Modal>
    )
}

export default VoucherModal;