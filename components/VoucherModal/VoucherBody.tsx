import { Badge, Button, Input } from "antd";
import { Dispatch, SetStateAction, memo } from "react";
import { IVoucher } from "../../apis/voucher";
import { isEmpty } from "lodash";
import moment from "moment";
import { diffThanCurrentDate } from "../../utils/helper";
import NoData from "../NoData";

const VoucherBody = ({
    setStep,
    setIsOpen,
    vouchers,
    setVoucherCode,
}: {
    setStep: Dispatch<
        SetStateAction<{
            step: number;
            header: string;
            buttons: JSX.Element[];
            heightModal: string;
            voucher: IVoucher | {};
        }>
    >;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    vouchers?: IVoucher[];
    setVoucherCode: Dispatch<SetStateAction<string>>;
}) => {
    const handleOnUseVoucher = (code: string) => {
        setStep({
            step: 1,
            header: "Promos",
            buttons: [
                <Button
                    onClick={handleCancel}
                    style={{ backgroundColor: "transparent" }}
                    key="CANCEL"
                >
                    Cancel
                </Button>,
            ],
            heightModal: "500px",
            voucher: {},
        });
        setIsOpen(false);
        setVoucherCode(code);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOnBack = () => {
        setStep({
            step: 1,
            header: "Promos",
            buttons: [
                <Button
                    onClick={handleCancel}
                    style={{ backgroundColor: "transparent" }}
                    key="CANCEL"
                >
                    Cancel
                </Button>,
            ],
            heightModal: "500px",
            voucher: {},
        });
    };

    const handleOnChangeStep = (e: any, voucher: IVoucher) => {
        if (e.target.className !== "use-now") {
            setStep((pre) => {
                return {
                    header: "Promos Detail",
                    step: 2,
                    buttons: [
                        <Button
                            onClick={handleOnBack}
                            style={{ backgroundColor: "transparent" }}
                            key="BACK"
                        >
                            Back
                        </Button>,
                        <Button
                            typeof="submit"
                            className={`text-white ${
                                voucher.isLimited ? "" : "hover-btn-custom"
                            }`}
                            onClick={() => handleOnUseVoucher(voucher.code)}
                            style={{
                                backgroundColor: voucher.isLimited
                                    ? "#ccc"
                                    : "var(--orange-4)",
                            }}
                            key="USE"
                            disabled={voucher.isLimited}
                        >
                            Use
                        </Button>,
                    ],
                    heightModal: "420px",
                    voucher,
                };
            });
        }
    };
    return (
        <>
            <div className="input-group mb-3 tch-delivery__input flex items-center w-full relative flex-wrap">
                <Input
                    placeholder="Enter your voucher"
                    className="form-control"
                    style={{
                        padding: "6px 10px",
                        borderRadius: 0,
                        border: "none",
                    }}
                />
                <div
                    className="flex input-group-prepend"
                    style={{ marginRight: "-1px" }}
                >
                    <Button className="btn btn--smoky-gray btn--radius-right-4 active">
                        <span className="text-white">Apply</span>
                    </Button>
                </div>
            </div>
            {!isEmpty(vouchers?.[0]) ? (
                <section>
                    <div className="card-product-option">
                        <span className="card-product-option-text">
                            Expiration Soon
                        </span>
                    </div>
                    <div className="tch-modal-sale-body">
                        <div
                            className="tch-sale-card mb-2"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                                handleOnChangeStep(
                                    e,
                                    vouchers?.[0] as IVoucher
                                );
                            }}
                        >
                            <div className="voucher-content flex items-center">
                                <div className="tch-sale-card-image flex justify-center">
                                    <img src={vouchers?.[0]?.imageUrl} />
                                </div>
                                <div className="tch-sale-card-content flex flex-col justify-between">
                                    <p className="text-description mb-0">
                                        {vouchers?.[0].nameVoucher}
                                    </p>
                                    <p
                                        className="text-expired-time mb-0"
                                        color="color:#D2691E"
                                    >
                                        Expired for{" "}
                                        {diffThanCurrentDate(
                                            vouchers?.[0].dateExpired || ""
                                        )}{" "}
                                        days
                                    </p>
                                    {vouchers?.[0].isLimited ? (
                                        <Badge
                                            className="mt-4"
                                            count={"Limited usage"}
                                        />
                                    ) : (
                                        <span
                                            className="use-now"
                                            onClick={() => {
                                                handleOnUseVoucher(
                                                    vouchers?.[0].code || ""
                                                );
                                            }}
                                        >
                                            Use now
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : undefined}

            <section>
                <div className="card-product-option">
                    <span className="card-product-option-text">All Promos</span>
                </div>
                <div className="tch-modal-sale-body">
                    {!isEmpty(vouchers) ? (
                        vouchers?.map((voucher) => (
                            <div
                                className="tch-sale-card mb-2 cursor-pointer"
                                key={voucher.id}
                                onClick={(e) => {
                                    handleOnChangeStep(e, voucher);
                                }}
                            >
                                <div className="voucher-content flex items-center">
                                    <div className="tch-sale-card-image flex justify-center">
                                        <img src={voucher.imageUrl} />
                                    </div>
                                    <div className="tch-sale-card-content flex flex-col justify-between">
                                        <p className="text-description mb-0">
                                            {voucher.nameVoucher}
                                        </p>
                                        <p
                                            className="text-expired-time mb-0"
                                            color="color:#D2691E"
                                        >
                                            Expired for{" "}
                                            {diffThanCurrentDate(
                                                voucher.dateExpired
                                            )}{" "}
                                            days
                                        </p>
                                        {voucher.isLimited ? (
                                            <Badge
                                                className="mt-4"
                                                count={"Limited usage"}
                                            />
                                        ) : (
                                            <span
                                                className="use-now"
                                                onClick={() => {
                                                    handleOnUseVoucher(
                                                        voucher.code || ""
                                                    );
                                                }}
                                            >
                                                Use now
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoData title={"No voucher available"} />
                    )}
                </div>
            </section>
        </>
    );
};

export default memo(VoucherBody);
