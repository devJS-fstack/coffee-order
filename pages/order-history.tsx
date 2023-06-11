import { Card, Collapse, Divider, Tag } from "antd";
import { FaHistory } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { useOrdersQuery } from "../apis/order";
import { useEffect } from "react";
import CustomSpin from "../components/Spin";
import { isEmpty } from "lodash";
import NoData from "../components/NoData";
import {
    getProductOrderByKey,
    headerCollapse,
} from "../components/OrderDetailAdmin/OrderDetailAdmin";
import { cssStatus } from "../components/OrderTable/OrderTable";

const OrderHistory = () => {
    const {
        data: orders,
        isFetching,
        refetch: refetchOrders,
    } = useOrdersQuery({});

    useEffect(() => {
        refetchOrders();
    }, []);
    return (
        <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="flex flex-col items-center">
                <FaHistory
                    style={{
                        height: "40px",
                        width: "40px",
                        color: "var(--orange-2)",
                    }}
                    className="text-center"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Ordered History
                </h2>
            </div>
            {isFetching ? (
                <CustomSpin />
            ) : isEmpty(orders) ? (
                <NoData
                    title="No Order Available"
                    subTitle={
                        <div>
                            No order have been ordered, Let's click{" "}
                            <span
                                className="cursor-pointer"
                                style={{
                                    color: "#0084ff",
                                    textDecoration: "underline",
                                }}
                            >
                                here
                            </span>{" "}
                            to discover more
                        </div>
                    }
                    className="mt-40"
                />
            ) : (
                orders?.map((order) => (
                    <Card
                        key={order.id}
                        headStyle={{
                            background: "var(--orange-2)",
                            color: "#fff",
                        }}
                        extra={<span>{order.totalPayment} $</span>}
                        className="cursor-pointer mt-12"
                        title={order.addressReceiver}
                    >
                        <Tag style={cssStatus[order.status]?.css}>
                            {cssStatus[order.status]?.status}
                        </Tag>
                        <Collapse ghost>
                            <div className="coffee-collapse">
                                {order?.productOrders?.map((productOrder) => (
                                    <Collapse
                                        className="mt-4"
                                        key={productOrder.id}
                                    >
                                        <Collapse.Panel
                                            showArrow={false}
                                            header={
                                                <div className="flex">
                                                    {headerCollapse.map(
                                                        (header) => (
                                                            <div
                                                                style={{
                                                                    width: 250,
                                                                }}
                                                                className="header-collapse__item"
                                                                key={header.key}
                                                            >
                                                                <div className="header-collapse__item-title">
                                                                    <span>
                                                                        {
                                                                            header.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="header-collapse__item-value">
                                                                    <span>
                                                                        {getProductOrderByKey(
                                                                            header.key,
                                                                            productOrder
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            }
                                            key={productOrder.id}
                                        >
                                            {productOrder.toppings.length ? (
                                                productOrder.toppings.map(
                                                    (topping) => (
                                                        <div key={topping.id}>
                                                            <div className="flex">
                                                                <div
                                                                    className="header-collapse__item"
                                                                    style={{
                                                                        width: 250,
                                                                    }}
                                                                >
                                                                    <div className="header-collapse__item-title">
                                                                        <span>
                                                                            Topping
                                                                            Name
                                                                        </span>
                                                                    </div>
                                                                    <div className="header-collapse__item-value">
                                                                        <span>
                                                                            {
                                                                                topping
                                                                                    .Topping
                                                                                    .nameTopping
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="header-collapse__item"
                                                                    style={{
                                                                        width: 250,
                                                                    }}
                                                                >
                                                                    <div className="header-collapse__item-title">
                                                                        <span>
                                                                            Quantity
                                                                        </span>
                                                                    </div>
                                                                    <div className="header-collapse__item-value">
                                                                        <span>
                                                                            {
                                                                                topping.quantity
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="header-collapse__item"
                                                                    style={{
                                                                        width: 250,
                                                                    }}
                                                                >
                                                                    <div className="header-collapse__item-title">
                                                                        <span>
                                                                            Price
                                                                        </span>
                                                                    </div>
                                                                    <div className="header-collapse__item-value">
                                                                        <span>
                                                                            {
                                                                                topping.totalPrice
                                                                            }{" "}
                                                                            $
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider />
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <NoData title="No toppings have been placed" />
                                            )}
                                        </Collapse.Panel>
                                    </Collapse>
                                ))}
                            </div>
                            <Collapse.Panel
                                header={
                                    <span className="font-medium">
                                        Other Fee
                                    </span>
                                }
                                key={1}
                            >
                                <div
                                    className="flex flex-col pl-12 py-0"
                                    key={1}
                                >
                                    <span className="p-1">
                                        Voucher Discount:{" "}
                                        <span className="font-medium">
                                            {order.voucherDiscount} $
                                        </span>
                                    </span>
                                    <span className="p-1">
                                        Shipping Fee:{" "}
                                        <span className="font-medium">
                                            {order.shippingFee} $
                                        </span>
                                    </span>
                                </div>
                            </Collapse.Panel>
                        </Collapse>
                    </Card>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
