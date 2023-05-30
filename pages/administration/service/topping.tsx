import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import { useToppingsQuery } from "../../../apis/topping";
import TableV1 from "../../../components/TableV1";
import { STATUS_COLOR } from "../../../utils/variable";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { useState } from "react";
import { ITopping } from "../../../apis/product";
import ToppingModal from "../../../components/ToppingModal/ToppingModal";

const ToppingAdmin = ({}: {}) => {
    const {
        data: toppings,
        isFetching: isFetchingToppings,
        refetch: refetchTopping,
    } = useToppingsQuery({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [toppingCurr, setToppingCurr] = useState({} as ITopping);
    return (
        <div className="w-full py-4">
            <ToppingModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                isEdit={false}
                topping={toppingCurr}
                refetchData={refetchTopping}
            />
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
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
                        dataIndex: "totalProduct",
                        key: "totalProduct",
                        width: 150,
                        render: (value, record) => {
                            return (
                                <span className="text-center">
                                    {value || "__"}
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
                                                        onClick={() => {}}
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
                                                        onClick={() => {}}
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
                                                        onClick={() => {}}
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
            />
        </div>
    );
};

export default ToppingAdmin;
