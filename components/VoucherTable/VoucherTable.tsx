import { Button, Tag } from "antd";
import TableV1 from "../TableV1";
import moment from "moment";
import { IVoucher, useAllVoucherQuery } from "../../apis/voucher";
import { PlusOutlined } from "@ant-design/icons";
import { STATUS_COLOR } from "../../utils/variable";

const VoucherTable = ({
    vouchers,
    isFetchingVoucher,
    refetchData,
}: {
    vouchers?: IVoucher[];
    isFetchingVoucher: boolean;
    refetchData: any;
}) => {
    return (
        <div className="w-full px-8">
            <TableV1
                loading={isFetchingVoucher}
                dataSource={vouchers}
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
                                    <div>{value}</div>
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
                ]}
            />
        </div>
    );
};

export default VoucherTable;
