import { Button, Input } from "antd"
import { Dispatch, SetStateAction, memo } from "react"

const VoucherBody = ({ setStep, setIsOpen }: 
    {
        setStep: Dispatch<SetStateAction<{
        step: number;
        header: string;
        buttons: JSX.Element[];
        heightModal: string;
        }>>
        setIsOpen: Dispatch<SetStateAction<boolean>>,
}) => {

    const handleOnUseVoucher = () => {
        setStep({
            step: 1,
            header: "Promos",
            buttons: [
                <Button onClick={handleCancel} style={{ backgroundColor: "transparent" }} key="CANCEL">
                    Cancel
                </Button>
            ],
            heightModal: "500px"
        });
        setIsOpen(false);
    }

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOnBack = () => {
        setStep({
            step: 1,
            header: "Promos",
            buttons: [
                <Button onClick={handleCancel} style={{ backgroundColor: "transparent" }} key="CANCEL">
                    Cancel
                </Button>
            ],
            heightModal: "500px"
        })
    }

    const handleOnChangeStep = (e: any) => {
        if (e.target.className !== "use-now") {
            setStep((pre) => {
                return {
                    header: "Promos Detail",
                    step: 2,
                    buttons: [
                        <Button onClick={handleOnBack} style={{ backgroundColor: "transparent" }} key="BACK">
                            Back
                        </Button>,
                        <Button typeof="submit" className="text-white hover-none" onClick={handleOnUseVoucher} style={{ backgroundColor: "var(--orange-4)" }} key="USE">
                            Use Now
                        </Button>
                    ],
                    heightModal: "420px"
                }
            })
        }
    }
    return (
        <>
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
                    <span className="card-product-option-text">Active Promos</span>
                </div>
                <div className="tch-modal-sale-body">
                    <div className="tch-sale-card mb-2" style={{ cursor: "pointer" }} onClick={(e) => { handleOnChangeStep(e) }}>
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
                    <span className="card-product-option-text">All Promos</span>
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
        </>
    )
}

export default memo(VoucherBody)