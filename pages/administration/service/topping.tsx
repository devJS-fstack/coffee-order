import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import {
    useDeleteToppingMutation,
    useToppingsQuery,
    useUpdateStatusToppingMutation,
} from "../../../apis/topping";
import TableV1 from "../../../components/TableV1";
import { STATUS_COLOR, STATUS_USERS } from "../../../utils/variable";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { ITopping } from "../../../apis/topping";
import ToppingModal from "../../../components/ToppingModal/ToppingModal";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { delay } from "../../../utils/helper";
import { toast } from "react-toastify";

const ToppingAdmin = ({}: {}) => {
    const {
        data: toppings,
        isFetching: isFetchingToppings,
        refetch: refetchTopping,
    } = useToppingsQuery({}, { refetchOnMountOrArgChange: true });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [toppingCurr, setToppingCurr] = useState({} as ITopping);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [mUpdateStatusTopping] = useUpdateStatusToppingMutation();
    const [mDeleteTopping] = useDeleteToppingMutation();

    const handleOnCancelUpdateStatus = () => {
        setIsOpenStatus(false);
    };

    const handleOnUpdateStatus = async () => {
        setIsLoadingBtn(true);
        await delay(500);
        const status = toppingCurr.enable
            ? STATUS_USERS.DISABLED
            : STATUS_USERS.ACTIVE;
        try {
            await mUpdateStatusTopping({ id: toppingCurr.id, status }).unwrap();
        } catch (error: any) {
            toast.error(error.message);
        }
        toast.success(
            `${toppingCurr.enable ? "Disable" : "Enable"} topping successfully`,
        );
        setIsLoadingBtn(false);
        setIsOpenStatus(false);
        refetchTopping();
    };

    const handleOnDelete = async () => {
        setIsLoadingBtn(true);
        await delay(500);
        try {
            await mDeleteTopping({ id: toppingCurr.id }).unwrap();
        } catch (error: any) {
            toast.error(error.message);
        }
        toast.success("Delete topping successfully.");
        setIsLoadingBtn(false);
        setIsOpenDelete(false);
        refetchTopping();
    };

    const handleOnCancelDelete = () => {
        setIsOpenDelete(false);
    };

    return (
        <div className="w-full py-4">
            <ToppingModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                isEdit={isEdit}
                topping={toppingCurr}
                refetchData={refetchTopping}
            />
            <ConfirmModal
                isOpen={isOpenDelete}
                okButtonProps={{ loading: isLoadingBtn }}
                handleCancel={handleOnCancelDelete}
                handleOk={handleOnDelete}
                title="Confirm Delete"
                okText="Delete"
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to delete topping{" "}
                            <span className="font-bold">
                                {toppingCurr.nameTopping}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <ConfirmModal
                isOpen={isOpenStatus}
                okButtonProps={{ loading: isLoadingBtn }}
                handleCancel={handleOnCancelUpdateStatus}
                handleOk={handleOnUpdateStatus}
                title={`Confirm ${toppingCurr.enable ? "Disable" : "Enable"}`}
                okText={toppingCurr.enable ? "Disable" : "Enable"}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to{" "}
                            {toppingCurr.enable ? "disable" : "enable"} topping{" "}
                            <span className="font-bold">
                                {toppingCurr.nameTopping}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
                        setIsEdit(false);
                        setIsOpenModal(true);
                    }}
                    className="hover-btn-custom"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "var(--orange-1)" }}
                >
                    New Topping
                </Button>
            </span>
            <TableV1
                dataSource={toppings}
                loading={isFetchingToppings}
                rowKey="id"
                columns={[
                    {
                        title: "Name Topping",
                        dataIndex: "nameTopping",
                        key: "nameTopping",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        key: "price",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <span>
                                        {value}{" "}
                                        <span className="font-bold">$</span>
                                    </span>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Total Product",
                        dataIndex: "productIds",
                        key: "productIds",
                        width: 150,
                        render: (value, record) => {
                            return (
                                <span className="text-center">
                                    {value.length || "__"}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "enable",
                        key: "enable",
                        render: (value, _) => {
                            return (
                                <Tag
                                    color={
                                        value
                                            ? STATUS_COLOR.ACTIVE
                                            : STATUS_COLOR.DISABLED
                                    }
                                >
                                    {value ? "ACTIVE" : "DISABLED"}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        key: "id",
                        render: (value, record) => {
                            const { enable } = record;
                            return (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "1",
                                                label: (
                                                    <span
                                                        className="flex justify-space-between items-center gap-2"
                                                        onClick={() => {
                                                            setIsEdit(true);
                                                            setToppingCurr(
                                                                record,
                                                            );
                                                            setIsOpenModal(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        <BsFillPencilFill />
                                                        <span>Modify</span>
                                                    </span>
                                                ),
                                            },
                                            {
                                                key: "2",
                                                label: (
                                                    <span
                                                        className="flex justify-space-between items-center gap-2"
                                                        onClick={() => {
                                                            setToppingCurr(
                                                                record,
                                                            );
                                                            setIsOpenStatus(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        {enable ? (
                                                            <GrStatusDisabledSmall
                                                                style={{
                                                                    color: "#F87171",
                                                                }}
                                                            />
                                                        ) : (
                                                            <BsCaretRightFill
                                                                style={{
                                                                    color: "green",
                                                                    fontSize: 17,
                                                                }}
                                                            />
                                                        )}
                                                        <span>
                                                            {enable
                                                                ? "Disable"
                                                                : "Enable"}
                                                        </span>
                                                    </span>
                                                ),
                                            },
                                            {
                                                key: "3",
                                                label: (
                                                    <span
                                                        onClick={() => {
                                                            setToppingCurr(
                                                                record,
                                                            );
                                                            setIsOpenDelete(
                                                                true,
                                                            );
                                                        }}
                                                        className="flex justify-space-between items-center gap-2"
                                                    >
                                                        <FiTrash color="red" />
                                                        <span>Delete</span>
                                                    </span>
                                                ),
                                            },
                                        ],
                                    }}
                                    placement="bottom"
                                    className="cursor-pointer"
                                >
                                    <span>
                                        <RiMoreFill />
                                    </span>
                                </Dropdown>
                            );
                        },
                    },
                ]}
                pagination={{
                    className: "pr-6",
                    total: toppings?.length || 0,
                    defaultPageSize: 10,
                    showTotal: (total) => (
                        <span className="antd-total-item">
                            Total {total} topping(s)
                        </span>
                    ),
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
            />
        </div>
    );
};

export default ToppingAdmin;
