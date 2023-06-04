import { Button } from "antd";
import { useAllVoucherQuery } from "../../apis/voucher";
import VoucherTable from "../../components/VoucherTable/VoucherTable";
import { PlusOutlined } from "@ant-design/icons";
import VoucherAdminModal from "../../components/VoucherAdminModal/VoucherAdminModal";
import { useState } from "react";

const VoucherAdmin = ({}: {}) => {
    const {
        data: vouchers,
        isFetching: isFetchingVoucher,
        refetch: refetchVoucher,
    } = useAllVoucherQuery({});
    const [isOpen, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className="w-full py-4">
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
                        setIsOpenModal(true);
                    }}
                    className="hover-btn-custom"
                    icon={<PlusOutlined />}
                    style={{
                        backgroundColor: "var(--orange-1)",
                        color: "white",
                    }}
                >
                    New Voucher
                </Button>
            </span>
            <VoucherTable
                vouchers={vouchers}
                isFetchingVoucher={isFetchingVoucher}
                refetchData={refetchVoucher}
            />
            <VoucherAdminModal
                isOpen={isOpen}
                isEdit={isEdit}
                refetchData={refetchVoucher}
                setIsOpen={setIsOpenModal}
            />
        </div>
    );
};

export default VoucherAdmin;
