import { Button, Dropdown, Tag } from "antd";
import TableV1 from "../TableV1";
import moment from "moment";
import { IVoucher, useAllVoucherQuery } from "../../apis/voucher";
import { PlusOutlined } from "@ant-design/icons";
import { STATUS_COLOR, VOUCHER_TYPES } from "../../utils/variable";
import { FiTrash } from "react-icons/fi";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { RiMoreFill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";

const VoucherTable = ({
    vouchers,
    isFetchingVoucher,
    refetchData,
    onClickModify,
    onClickUpdateStatus,
    onClickDelete,
}: {
    vouchers?: IVoucher[];
    isFetchingVoucher: boolean;
    refetchData: any;
    onClickModify: (record: IVoucher) => void;
    onClickUpdateStatus: (record: IVoucher) => void;
    onClickDelete: (record: IVoucher) => void;
}) => {
    return (
        <div className="w-full px-8">
            <TableV1
                loading={isFetchingVoucher}
                dataSource={vouchers}
                rowKey={"id"}
                columns={[
                    {
                        title: "Code",
                        dataIndex: "code",
                        key: "code",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Name Voucher",
                        dataIndex: "nameVoucher",
                        key: "nameVoucher",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>
                                        {value ===
                                        VOUCHER_TYPES.PERCENT_DISCOUNT
                                            ? "Percent Discount"
                                            : "Price Discount"}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Date Start",
                        dataIndex: "dateStart",
                        key: "dateStart",
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
                        title: "Date Expired",
                        dataIndex: "dateExpired",
                        key: "dateExpired",
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
                        title: "Min Payment",
                        dataIndex: "minPayment",
                        key: "minPayment",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value} $</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Max Discount",
                        dataIndex: "maxDiscount",
                        key: "maxDiscount",
                        render: (value, record) => {
                            return (
                                <div className="flex items-center gap-x-2">
                                    <div>{value} $</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "enable",
                        key: "enable",
                        render: (value, record: IVoucher) => {
                            const { dateExpired, dateStart } = record;
                            const isExpired = moment(dateExpired).isBefore(
                                moment()
                            );
                            return (
                                <div className="flex items-center gap-x-2">
                                    <Tag
                                        color={
                                            STATUS_COLOR[
                                                isExpired
                                                    ? "DISABLED"
                                                    : value
                                                    ? "ACTIVE"
                                                    : "DISABLED"
                                            ]
                                        }
                                    >
                                        {isExpired
                                            ? "EXPIRED"
                                            : value
                                            ? "ACTIVE"
                                            : "DISABLED"}
                                    </Tag>
                                </div>
                            );
                        },
                    },
                    {
                        title: "",
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
                                                            onClickModify(
                                                                record
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
                                                            onClickUpdateStatus(
                                                                record
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
                                                            onClickDelete(
                                                                record
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
            />
        </div>
    );
};

export default VoucherTable;
