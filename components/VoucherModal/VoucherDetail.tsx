import { CopyFilled } from "@ant-design/icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";


const VoucherDetail = () => {
    const [isCopied, setIsCopied] = useState(false);
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
                <h4 className="tch-detail-sale-box-title mb-1">Discount 50%</h4>
                <p className="tch-text-expired-time" color="#D2691E">Expired in 3 days</p>
                <img src="https://minio.thecoffeehouse.com/image/admin/1682870140_banner-coup-1mb-2.jpg" className="tch-detail-sale-box-image"/>
                <span className="tch-text-user-info mb-0">
                    <span className="text mr-1">DIS329</span>
                    <CopyFilled className="cursor-pointer" style={{ color: "#ff792c" }} onClick={() => handleOnClickCopy("DIS329")}/>
                </span>
                <span className="text-center tch-text-user-info" style={{ color: "#777" }}>
                50% off orders from 4 glasses of water or more with FREE SHIP
                    - Apply Delivery service when ordering via App/Web The Coffee House
                    - Applicable to all water (Except Fresh bottle)
                    - Not applicable for parallel promotions
                    - Time of application: From Monday to Friday, weekdays
                </span>
            </div>
        </div>
    )
}

export default VoucherDetail