import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Dropdown, Tag, TreeSelect } from "antd";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { AiFillFilter } from "react-icons/ai";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IResponseOrders, useOrdersByAdminQuery } from "../../apis/order";
import TableV1 from "../TableV1";
import moment from "moment";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const cssStatus: any = {
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

const plainOptions = [
    "Created",
    "Ordered",
    "Processed",
    "In-transit",
    "Received",
];

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
    const [orderSource, setOrderSource] = useState(orders);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkedListApply, setCheckedListApply] = useState<
        CheckboxValueType[]
    >(["Ordered"]);
    const [checkedList, setCheckedList] =
        useState<CheckboxValueType[]>(checkedListApply);
    const [checkAll, setCheckAll] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const handleOnChangeCheckbox = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const getNewOrders = () => {
        const newCheckedList = checkedList.map((checkedItem: any) => {
            let newCheckedItem = checkedItem.toUpperCase();
            newCheckedItem = newCheckedItem.replace("-", "_");
            return newCheckedItem;
        });
        const newOrders = (orders || []).filter((order) =>
            newCheckedList.includes(order.status)
        );
        return newOrders;
    };

    const handleOnApplyFilter = () => {
        setOpenDropdown(false);
        setCheckedListApply(checkedList);
        const newOrders = getNewOrders();
        setOrderSource(newOrders);
        if (!newOrders.length) {
            setOrderCurrent({} as IResponseOrders);
        }
    };

    useEffect(() => {
        const newOrders = getNewOrders();
        setOrderSource(newOrders);
    }, [orders]);

    useEffect(() => {
        const isIncludeIdSelect = orderSource?.some(
            (order) => order.id === orderIdSelect
        );
        if (!isIncludeIdSelect && orderSource?.length) {
            setOrderIdSelect(orderSource[0].id);
            setOrderCurrent({
                ...orderSource?.find((order) => order.id === orderSource[0].id),
            } as IResponseOrders);
        } else {
            setOrderCurrent({
                ...orderSource?.find((order) => orderIdSelect === order.id),
            } as IResponseOrders);
        }

        if (!orderSource?.length) {
            setOrderCurrent({} as IResponseOrders);
        }
    }, [orderSource]);

    return (
        <div className="w-full px-8">
            <div className="flex justify-end py-4">
                <Dropdown
                    overlayStyle={{
                        width: 300,
                    }}
                    open={openDropdown}
                    onOpenChange={(isOpen) => {
                        if (isOpen) {
                            setCheckedList(checkedListApply);
                            setIndeterminate(
                                !!checkedListApply.length &&
                                    checkedListApply.length <
                                        plainOptions.length
                            );
                            setCheckAll(
                                checkedListApply.length === plainOptions.length
                            );
                        }
                        setOpenDropdown(isOpen);
                    }}
                    dropdownRender={(menu) => {
                        return (
                            <div className="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light">
                                <div className="filter-status flex flex-col">
                                    <Checkbox
                                        className="checkbox-title mb-3"
                                        indeterminate={indeterminate}
                                        onChange={onCheckAllChange}
                                        checked={checkAll}
                                    >
                                        Statuses
                                    </Checkbox>
                                    <div className="">
                                        <Checkbox.Group
                                            className="mb-3 checkbox-status__item"
                                            options={plainOptions}
                                            style={{ marginLeft: 8 }}
                                            value={checkedList}
                                            onChange={handleOnChangeCheckbox}
                                        />
                                    </div>
                                </div>
                                <Divider
                                    style={{ marginTop: 0, marginBottom: 8 }}
                                />
                                <div className="button-group mr-4">
                                    <Button
                                        className="group-btn__clear"
                                        onClick={() => {
                                            setCheckedList([]);
                                            setCheckAll(false);
                                            setIndeterminate(false);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        className="group-btn__apply"
                                        onClick={() => {
                                            handleOnApplyFilter();
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </div>
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
                        onClick={() => {
                            setOpenDropdown(true);
                        }}
                    >
                        Status
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
                dataSource={orderSource}
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
                        width: 300,
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
                    {
                        title: "Created",
                        dataIndex: "created",
                        key: "created",
                        sorter: (a, b) =>
                            moment(a.created).unix() - moment(b.created).unix(),
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>
                                        {moment(value)
                                            .utc()
                                            .format("MMMM.DD.YYYY hh:mm A")}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Updated",
                        dataIndex: "updated",
                        key: "updated",
                        sorter: (a, b) =>
                            moment(a.updated).unix() - moment(b.updated).unix(),
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>
                                        {moment(value)
                                            .utc()
                                            .format("MMMM.DD.YYYY hh:mm A")}
                                    </div>
                                </div>
                            );
                        },
                    },
                ]}
                pagination={{
                    className: "pr-6",
                    total: orderSource?.length || 0,
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
                scroll={{ y: 220 }}
            />
        </div>
    );
};

export default OrderTable;
