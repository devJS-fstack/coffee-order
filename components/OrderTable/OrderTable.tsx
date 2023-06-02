import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag, TreeSelect } from "antd";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { AiFillFilter } from "react-icons/ai";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IResponseOrders, useOrdersByAdminQuery } from "../../apis/order";
import TableV1 from "../TableV1";
import moment from "moment";

const cssStatus: any = {
    CREATED: {
        css: {},
        status: "Created",
    },
    ORDERED: {
        css: {
            backgroundColor: "var(--yellow-100)",
            borderColor: "var(--yellow-100)",
            color: "var(--orange-600)",
        },
        status: "Ordered",
    },
    PROCESSED: {
        css: {
            backgroundColor: "var(--blue-100)",
            borderColor: "var(--blue-100)",
            color: " var(--blue-600)",
        },
        status: "Processed",
    },
    IN_TRANSIT: {
        css: {
            backgroundColor: "var(--blue-100)",
            borderColor: "var(--blue-100)",
            color: " var(--blue-600)",
        },
        status: "In-transit",
    },
    RECEIVED: {
        css: {
            backgroundColor: "var(--green-100)",
            borderColor: "var(--green-100)",
            color: " var(--green-600)",
        },
        status: "Received",
    },
};

const OrderTable = ({
    orders,
    isFetchingOrder,
    setOrderCurrent,
}: {
    orders?: IResponseOrders[];
    isFetchingOrder: boolean;
    setOrderCurrent: Dispatch<SetStateAction<IResponseOrders>>;
}) => {
    const [orderIdSelect, setOrderIdSelect] = useState(0);

    useEffect(() => {
        if (!orderIdSelect) {
            setOrderIdSelect(orders?.[0].id || 0);
        }
    }, [orders]);
    return (
        <div className="w-full px-8">
            <div className="flex justify-end py-4">
                <Dropdown
                    overlayStyle={{
                        width: 300,
                    }}
                    dropdownRender={(menu) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: "15px",
                                }}
                            >
                                Hello
                            </div>
                        );
                    }}
                    trigger={["click"]}
                >
                    <Button
                        className="flex items-center relative bg-gray50 border-gray200 border-solid"
                        icon={
                            <span
                                className="mr-2 relative"
                                style={{ height: 14, width: 14 }}
                            >
                                <AiFillFilter
                                    style={{
                                        position: "absolute",
                                        right: 4,
                                    }}
                                />
                            </span>
                        }
                        onClick={() => {}}
                    >
                        Filter
                    </Button>
                </Dropdown>
            </div>
            <TableV1
                onRow={(record, index) => {
                    return {
                        onClick: (e) => {
                            setOrderIdSelect(record.id);
                            setOrderCurrent(record);
                        },
                    };
                }}
                rowClassName={(record, index) => {
                    return record.id === orderIdSelect
                        ? "ant-table-row-selected cursor-pointer"
                        : "cursor-pointer";
                }}
                dataSource={orders}
                loading={isFetchingOrder}
                rowKey={"id"}
                columns={[
                    {
                        title: "Created",
                        dataIndex: "created",
                        key: "created",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>
                                        {moment(value).format("MMMM.DD.YYYY")}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Name Receiver",
                        dataIndex: "nameReceiver",
                        key: "nameReceiver",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Phone Receiver",
                        dataIndex: "phoneReceiver",
                        key: "phoneReceiver",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Address",
                        width: 350,
                        dataIndex: "addressReceiver",
                        key: "addressReceiver",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Payment Method",
                        dataIndex: "paymentMethod",
                        key: "paymentMethod",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>Cash</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        filterMode: "menu",
                        render: (value, _) => {
                            return (
                                <Tag style={cssStatus[value]?.css}>
                                    {cssStatus[value]?.status}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: "Shipping Fee",
                        dataIndex: "shippingFee",
                        key: "shippingFee",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value} $</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Total Payment",
                        dataIndex: "totalPayment",
                        key: "totalPayment",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value} $</div>
                                </div>
                            );
                        },
                    },
                ]}
                pagination={{
                    className: "pr-6",
                    total: orders?.length || 0,
                    defaultPageSize: 10,
                    pageSize: 10,
                    showTotal: (total) => (
                        <span className="antd-total-item">
                            Total {total} order(s)
                        </span>
                    ),
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
                scroll={{ y: 320 }}
            />
        </div>
    );
};

export default OrderTable;
