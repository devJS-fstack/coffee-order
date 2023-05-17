import { Button, Modal } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import Scrollbars from "react-custom-scrollbars";
import VoucherBody from "./VoucherBody";
import VoucherDetail from "./VoucherDetail";
import { useVouchersQuery } from "../../apis/voucher";
import CustomSpin from "../Spin";

const VoucherModal = ({ 
    isOpen,
    setIsOpen,
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}) => {
    const { data: vouchers, isLoading } = useVouchersQuery({});

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
        heightModal: "500px",
        voucher: {},
    });

    return (
        <Modal
            title={step.header}
            open={isOpen} onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" }}}
            footer={step.buttons}
            >
                {
                    !isLoading ?
                    <Scrollbars renderThumbHorizontal={() => <div></div>} autoHide style={{ height: step.heightModal, overflowX: "hidden" }}>
                        {
                            step.step === 1 ? <VoucherBody vouchers={vouchers} setStep={setStep} setIsOpen={setIsOpen}/> 
                            : <VoucherDetail voucher={step.voucher}/>
                        }
                    </Scrollbars>
                    :
                    <CustomSpin style={{ height: "200px" }}/>
                }
        </Modal>
    )
}

export default VoucherModal;