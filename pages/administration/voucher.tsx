import { Button } from "antd";
import {
    IVoucher,
    useAllVoucherQuery,
    useDeleteVoucherMutation,
    useUpdateStatusVoucherMutation,
} from "../../apis/voucher";
import VoucherTable from "../../components/VoucherTable/VoucherTable";
import { PlusOutlined } from "@ant-design/icons";
import VoucherAdminModal from "../../components/VoucherAdminModal/VoucherAdminModal";
import { useState, useEffect } from "react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { STATUS_USERS } from "../../utils/variable";
import { toast } from "react-toastify";
import { delay } from "../../utils/helper";

const VoucherAdmin = ({}: {}) => {
    const {
        data: vouchers,
        isFetching: isFetchingVoucher,
        refetch: refetchVoucher,
    } = useAllVoucherQuery({});
    const [mUpdateStatusVoucher] = useUpdateStatusVoucherMutation();
    const [mDeleteVoucher] = useDeleteVoucherMutation();
    const [isOpen, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [voucherCurr, setVoucherCurr] = useState({} as IVoucher);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const handleOnClickModify = (record: IVoucher) => {
        setVoucherCurr(record);
        setIsEdit(true);
        setIsOpenModal(true);
    };

    const handleOnClickUpdateStatus = (record: IVoucher) => {
        setVoucherCurr(record);
        setIsOpenConfirm(true);
    };

    const handleOnCancelConfirm = () => {
        setIsOpenConfirm(false);
    };

    const handleOnUpdateStatus = async () => {
        const status = voucherCurr.enable
            ? STATUS_USERS.DISABLED
            : STATUS_USERS.ACTIVE;
        setIsLoadingBtn(true);
        await delay(500);
        try {
            await mUpdateStatusVoucher({ status, id: voucherCurr.id }).unwrap();
            toast.success(
                `${
                    voucherCurr.enable ? "Disable" : "Enable"
                } voucher successfully`
            );
        } catch (error: any) {
            toast.error(error.message);
            setIsLoadingBtn(false);
            return;
        }
        refetchVoucher();
        setIsLoadingBtn(false);
        setIsOpenConfirm(false);
    };

    const handleOnClickDelete = (record: IVoucher) => {
        setVoucherCurr(record);
        setIsOpenConfirmDelete(true);
    };

    const handleOnCancelDelete = () => {
        setIsOpenConfirmDelete(false);
    };

    const handleOnDelete = async () => {
        setIsLoadingBtn(true);
        await delay(500);
        try {
            await mDeleteVoucher({ voucherId: voucherCurr.id || 0 }).unwrap();
            toast.success("Delete voucher successfully");
        } catch (error: any) {
            toast.error(error.message);
            setIsLoadingBtn(false);
            return;
        }
        refetchVoucher();
        setIsLoadingBtn(false);
        setIsOpenConfirmDelete(false);
    };

    useEffect(() => {
        refetchVoucher();
    }, []);

    return (
        <div className="w-full py-4">
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
                        setIsEdit(false);
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
                onClickModify={handleOnClickModify}
                onClickUpdateStatus={handleOnClickUpdateStatus}
                onClickDelete={handleOnClickDelete}
            />
            <VoucherAdminModal
                isOpen={isOpen}
                isEdit={isEdit}
                refetchData={refetchVoucher}
                setIsOpen={setIsOpenModal}
                voucher={voucherCurr}
            />
            <ConfirmModal
                isOpen={isOpenConfirm}
                handleCancel={handleOnCancelConfirm}
                handleOk={handleOnUpdateStatus}
                title={`Confirm ${voucherCurr.enable ? "Disable" : "Enable"}`}
                okText={voucherCurr.enable ? "Disable" : "Enable"}
                okButtonProps={{ loading: isLoadingBtn }}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to{" "}
                            {voucherCurr.enable ? "disable" : "enable"} voucher{" "}
                            <span className="font-bold">
                                {voucherCurr.code}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <ConfirmModal
                isOpen={isOpenConfirmDelete}
                handleCancel={handleOnCancelDelete}
                handleOk={handleOnDelete}
                okButtonProps={{ loading: isLoadingBtn }}
                title="Confirm Delete"
                okText="Delete"
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to delete voucher{" "}
                            <span className="font-bold">
                                {voucherCurr.code}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
        </div>
    );
};

export default VoucherAdmin;
