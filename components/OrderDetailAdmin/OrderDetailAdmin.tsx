import { Button, Collapse, Divider, Steps } from "antd";
import { AiTwotoneCalendar } from "react-icons/ai";
import { STEP_ICONS } from "../../assets/icon";
import { IResponseOrders, IResponseProductOrder } from "../../apis/order";
import { PlusOutlined } from "@ant-design/icons";
import NoData from "../NoData";

const headerCollapse = [
    {
        title: "Product Name",
        key: "nameProduct",
    },
    {
        title: "Quantity",
        key: "quantity",
    },
    {
        title: "Size",
        key: "size",
    },
    {
        title: "Price",
        key: "totalPrice",
    },
    {
        title: "Topping Quantity",
        key: "totalTopping",
    },
];

const steps = {
    CREATED: 0,
    ORDERED: 1,
    PROCESSED: 2,
    IN_TRANSIT: 3,
    RECEIVED: 4,
};

const OrderDetailAdmin = ({ order }: { order?: IResponseOrders }) => {
    console.log(order);
    const getProductOrderByKey = (
        key: string,
        productOrder: IResponseProductOrder
    ) => {
        switch (key) {
            case "nameProduct":
                return productOrder.nameProduct;
            case "quantity":
                return productOrder.quantity;
            case "size":
                return productOrder.size;
            case "totalPrice":
                return productOrder.totalPrice + " $";
            case "totalTopping":
                return productOrder.toppings.length;
            default:
                return "";
        }
    };
    return (
        <div className="px-12 pt-4">
            <div className="flex justify-end pb-8">
                <Button
                    className="hover-btn-custom relative"
                    style={{
                        backgroundColor: "var(--orange-1)",
                        color: "#fff",
                    }}
                    onClick={() => {}}
                >
                    Mark as Processed
                </Button>
            </div>
            <Steps
                current={0}
                items={[
                    {
                        title: "Created",
                        icon: <img src={STEP_ICONS.CREATED} />,
                    },
                    {
                        title: "Ordered",
                        icon: <img src={STEP_ICONS.ORDER} />,
                    },
                    {
                        title: "Processed",
                        icon: <img src={STEP_ICONS.PROCESS} />,
                    },
                    {
                        title: "In-transit",
                        icon: <img src={STEP_ICONS.IN_TRANSIT} />,
                    },
                    {
                        title: "Received",
                        icon: <img src={STEP_ICONS.RECEIVE} />,
                    },
                ]}
            />
            <div className="coffee-collapse mt-8 ">
                {order?.productOrders?.map((productOrder) => (
                    <Collapse className="mt-4" key={productOrder.id}>
                        <Collapse.Panel
                            showArrow={false}
                            header={
                                <div className="flex justify-between">
                                    {headerCollapse.map((header) => (
                                        <div
                                            className="header-collapse__item"
                                            key={header.key}
                                        >
                                            <div className="header-collapse__item-title">
                                                <span>{header.title}</span>
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
                                    ))}
                                </div>
                            }
                            key={productOrder.id}
                        >
                            {productOrder.toppings.length ? (
                                productOrder.toppings.map((topping) => (
                                    <div key={topping.id}>
                                        <div className="flex justify-between">
                                            <div className="header-collapse__item">
                                                <div className="header-collapse__item-title">
                                                    <span>Topping Name</span>
                                                </div>
                                                <div className="header-collapse__item-value">
                                                    <span>
                                                        {
                                                            topping.Topping
                                                                .nameTopping
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="header-collapse__item">
                                                <div className="header-collapse__item-title">
                                                    <span>Quantity</span>
                                                </div>
                                                <div className="header-collapse__item-value">
                                                    <span>
                                                        {topping.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="header-collapse__item">
                                                <div className="header-collapse__item-title">
                                                    <span>Price</span>
                                                </div>
                                                <div className="header-collapse__item-value">
                                                    <span>
                                                        {topping.totalPrice} $
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>
                                ))
                            ) : (
                                <NoData title="No toppings have been placed" />
                            )}
                        </Collapse.Panel>
                    </Collapse>
                ))}
            </div>
        </div>
    );
};

export default OrderDetailAdmin;
