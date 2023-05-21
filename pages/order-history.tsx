import { Card, Collapse } from "antd";
import { FaHistory } from "react-icons/fa"
import { FcMoneyTransfer } from "react-icons/fc"
import { useOrdersQuery } from "../apis/order";
import { useEffect } from "react";
import CustomSpin from "../components/Spin";
import { isEmpty } from "lodash";
import NoData from "../components/NoData";

const OrderHistory = () => {
    const { data: orders, isFetching } = useOrdersQuery({});
    return (
        <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="flex flex-col items-center">
                <FaHistory style={{ height: "40px", width: "40px", color: "var(--orange-2)" }} className="text-center"/>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ordered History</h2>
            </div>
            {
                isFetching ? <CustomSpin/>
                :
                isEmpty(orders) ?
                <NoData title="No Order Available" subTitle={
                    (
                        <div>
                            No order have been ordered, Let's click <span className="cursor-pointer" style={{ color: "#0084ff", textDecoration: "underline" }}>here</span> to discover more
                        </div>
                    )
                } className="mt-40"/>
                :
                orders?.map(order => 
                    (
                        <Card key={order.id} headStyle={{ background: "var(--orange-2)", color: "#fff" }}
                            extra={
                                <span>
                                    {order.totalPayment} $
                                </span>
                            }
                            className="cursor-pointer mt-12" 
                            title={order.addressReceiver}>
                            <Collapse ghost>
                                {
                                    order.productOrders.map(productOrder => (
                                        <Collapse.Panel
                                            header={
                                            <span>
                                                x {productOrder.quantity} <span className="font-medium">
                                                    {productOrder.nameProduct} as <span className="font-medium">{productOrder.totalPrice} $</span>
                                                </span>
                                            </span>
                                        } 
                                            key={productOrder.id}>
                                                {
                                                    !productOrder.toppings.length ?
                                                    <NoData className="py-0" title="No topping have been placed"/> :
                                                    productOrder.toppings.map(orderTopping => (
                                                        <div className="flex flex-col pl-12" key={orderTopping.id}>
                                                            <span key={orderTopping.id}>
                                                                x {orderTopping.quantity} {orderTopping.Topping.nameTopping}: <span className="font-medium">{orderTopping.totalPrice}  $</span>
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                        </Collapse.Panel>
                                    ))
                                }
                                <Collapse.Panel header={<span className="font-medium">Other Fee</span>} key={1}>
                                    <div className="flex flex-col pl-12 py-0" key={1}>
                                        <span className="p-1">
                                            Voucher Discount: <span className="font-medium">{order.voucherDiscount} $</span>
                                        </span>
                                        <span className="p-1">
                                            Shipping Fee: <span className="font-medium">{order.shippingFee} $</span>
                                        </span>
                                    </div>
                                </Collapse.Panel>
                            </Collapse>
                        </Card>
                    ))
            }
        </div>
    )
}

export default OrderHistory;