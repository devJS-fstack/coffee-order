import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useOrdersByAdminQuery } from "../../apis/order";
import TableV1 from "../TableV1";

const OrderTable = ({}: {}) => {
    const { data: orders, isFetching: isFetchingOrder } = useOrdersByAdminQuery(
        {},
    );
    const [orderIdSelect, setOrderIdSelect] = useState(0);
    console.log(orders);
    return (
        <div className="w-full py-4">
            <TableV1
                onRow={(record, index) => {
                    return {
                        onClick: (e) => {
                            setOrderIdSelect(record.id);
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
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (value, _) => {
                            return <Tag>{value}</Tag>;
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
