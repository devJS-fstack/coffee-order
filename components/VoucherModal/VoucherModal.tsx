import { Button, Modal } from "antd";
import { Input } from "antd";
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
            title="Promos"
            open={isOpen} onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" } }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
            >
                <Scrollbars autoHide style={{ height: 500 }}>
                    <div className="input-group mb-3 tch-delivery__input flex items-center w-full relative flex-wrap">
                        <Input placeholder="Enter your voucher" className="form-control" style={{ padding: "6px 10px", borderRadius: 0, border: "none" }} />
                        <div className="flex input-group-prepend" style={{ marginRight: "-1px" }}>
                            <Button className="btn btn--smoky-gray btn--radius-right-4 active">
                                <span className="text-white">Apply</span>
                            </Button>
                        </div>
                    </div>
                    <section>
                        <div className="card-product-option">
                            <span className="card-product-option-text">PROMOS ACTIVE</span>
                        </div>
                        <div className="tch-modal-sale-body">
                            <div className="tch-sale-card mb-2">
                                <div className="voucher-content flex items-center">
                                    <div className="tch-sale-card-image flex justify-center">
                                        <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg"/>
                                    </div>
                                    <div className="tch-sale-card-content flex flex-col justify-between">
                                        <p className="text-description mb-0">Discount 50%</p>
                                        <p className="text-expired-time mb-0" color="color:#D2691E">Expired for 4 days</p>
                                        <span className="use-now">Use now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="card-product-option">
                            <span className="card-product-option-text">PROMOS ACTIVE</span>
                        </div>
                        <div className="tch-modal-sale-body">
                            <div className="tch-sale-card mb-2">
                                <div className="voucher-content flex items-center">
                                    <div className="tch-sale-card-image flex justify-center">
                                        <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg"/>
                                    </div>
                                    <div className="tch-sale-card-content flex flex-col justify-between">
                                        <p className="text-description mb-0">Discount 50%</p>
                                        <p className="text-expired-time mb-0" color="color:#D2691E">Expired for 4 days</p>
                                        <span className="use-now">Use now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tch-sale-card mb-2">
                                <div className="voucher-content flex items-center">
                                    <div className="tch-sale-card-image flex justify-center">
                                        <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg"/>
                                    </div>
                                    <div className="tch-sale-card-content flex flex-col justify-between">
                                        <p className="text-description mb-0">Discount 50%</p>
                                        <p className="text-expired-time mb-0" color="color:#D2691E">Expired for 4 days</p>
                                        <span className="use-now">Use now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tch-sale-card mb-2">
                                <div className="voucher-content flex items-center">
                                    <div className="tch-sale-card-image flex justify-center">
                                        <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg"/>
                                    </div>
                                    <div className="tch-sale-card-content flex flex-col justify-between">
                                        <p className="text-description mb-0">Discount 50%</p>
                                        <p className="text-expired-time mb-0" color="color:#D2691E">Expired for 4 days</p>
                                        <span className="use-now">Use now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Scrollbars>
        </Modal>
    )
}

export default VoucherModal;