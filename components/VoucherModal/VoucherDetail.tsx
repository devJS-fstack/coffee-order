import { CopyFilled } from "@ant-design/icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { IVoucher } from "../../apis/voucher";
import { diffThanCurrentDate } from "../../utils/helper";

const VoucherDetail = ({ voucher }: { voucher: IVoucher | {}}) => {
    const [isCopied, setIsCopied] = useState(false);
    const voucherRef = voucher as IVoucher
    const handleOnClickCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        toast.success("Copied to clipboard", { autoClose: 2000 });
    }

    if (typeof window !== "undefined") {
        injectStyle();
    }

    return (
        <div className="flex flex-col justify-between">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="tch-detail-sale-box flex flex-col items-center">
                <h4 className="tch-detail-sale-box-title mb-1">{voucherRef.nameVoucher}</h4>
                <p className="tch-text-expired-time" color="#D2691E">Expired in {diffThanCurrentDate(voucherRef.dateExpired)} days</p>
                <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg" className="tch-detail-sale-box-image"/>
                <span className="tch-text-user-info mb-0">
                    <span className="text mr-1">{voucherRef.code}</span>
                    <CopyFilled className="cursor-pointer" style={{ color: "#ff792c" }} onClick={() => handleOnClickCopy(voucherRef.code)}/>
                </span>
                <span className="text-center tch-text-user-info" style={{ color: "#777" }}>
                    {voucherRef.description}
                </span>
            </div>
        </div>
    )
}

export default VoucherDetail