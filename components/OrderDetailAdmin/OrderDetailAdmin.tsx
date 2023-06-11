import { Button, Collapse, Divider, Steps, Tooltip } from "antd";
import { AiTwotoneCalendar } from "react-icons/ai";
import { STEP_ICONS } from "../../assets/icon";
import {
    IResponseOrders,
    IResponseProductOrder,
    useMarkStatusMutation,
} from "../../apis/order";
import { InfoCircleTwoTone } from "@ant-design/icons";
import NoData from "../NoData";
import { useEffect, useState } from "react";
import { delay } from "../../utils/helper";
import CustomSpin from "../Spin";
import moment from "moment";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { isEmpty } from "lodash";

export const headerCollapse = [
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

const statusOrders = {
    CREATED: "CREATED",
    ORDERED: "ORDERED",
    PROCESSED: "PROCESSED",
    IN_TRANSIT: "IN_TRANSIT",
    RECEIVED: "RECEIVED",
};

const steps: any = {
    CREATED: 0,
    ORDERED: 1,
    PROCESSED: 2,
    IN_TRANSIT: 3,
    RECEIVED: 4,
};

const markByStatus: any = {
    ORDERED: "Processed",
    PROCESSED: "In-transit",
    IN_TRANSIT: "Received",
};

export const getProductOrderByKey = (
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

const OrderDetailAdmin = ({
    order,
    refetchData,
    isFetchingData,
}: {
    order?: IResponseOrders;
    refetchData: any;
    isFetchingData: boolean;
}) => {
    console.log(order);
    const {
        status,
        created,
        orderedDate,
        shipDate,
        receivedDate,
        processedDate,
        plannedReceivedDate,
    } = order as IResponseOrders;
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [mMarkStatusOrder] = useMarkStatusMutation();

    const handleOnMarkStatus = async () => {
        setIsLoadingBtn(true);
        await delay(500);
        try {
            await mMarkStatusOrder({ orderId: order?.id || 0 }).unwrap();
        } catch (error: any) {
            toast.error(error);
            setIsLoadingBtn(false);
            return;
        }
        setIsLoadingBtn(false);
        setIsOpenConfirm(false);
        refetchData();
    };

    useEffect(() => {
        setIsLoading(true);
        delay(500).then(() => {
            setIsLoading(false);
        });
    }, [order]);
    return (
        <div className="px-12 pt-4">
            <ConfirmModal
                isOpen={isOpenConfirm}
                okButtonProps={{ loading: isLoadingBtn }}
                handleCancel={() => {
                    setIsOpenConfirm(false);
                }}
                handleOk={handleOnMarkStatus}
                title="Confirm Mark"
                okText="Proceed"
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to mark status as{" "}
                            <span className="font-bold">
                                {markByStatus[status]}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            {isLoading ? (
                <CustomSpin style={{ alignItems: "baseline" }} />
            ) : (
                !isEmpty(order) && (
                    <>
                        <div className="flex justify-end pb-8">
                            {![
                                statusOrders.CREATED,
                                statusOrders.RECEIVED,
                            ].includes(status) && (
                                <Button
                                    className="hover-btn-custom relative"
                                    style={{
                                        backgroundColor: "var(--orange-1)",
                                        color: "#fff",
                                    }}
                                    onClick={() => {
                                        setIsOpenConfirm(true);
                                    }}
                                >
                                    Mark as {markByStatus[status]}
                                </Button>
                            )}
                        </div>
                        <Steps
                            current={steps[status]}
                            labelPlacement="vertical"
                            items={[
                                {
                                    description: (
                                        <div className="flex flex-col">
                                            <span>Created</span>
                                            <span className="ant-step-description__date">
                                                {created
                                                    ? moment(created)
                                                          .utc()
                                                          .format(
                                                              "MMMM.DD.YYYY hh:mm A"
                                                          )
                                                    : ""}
                                            </span>
                                        </div>
                                    ),
                                    icon: <img src={STEP_ICONS.CREATED} />,
                                },
                                {
                                    description: (
                                        <div className="flex flex-col">
                                            <span>Ordered</span>
                                            <span className="ant-step-description__date">
                                                {orderedDate
                                                    ? moment(orderedDate)
                                                          .utc()
                                                          .format(
                                                              "MMMM.DD.YYYY hh:mm A"
                                                          )
                                                    : ""}
                                            </span>
                                        </div>
                                    ),
                                    icon: (
                                        <img
                                            src={
                                                steps[status] >=
                                                steps[statusOrders.ORDERED]
                                                    ? STEP_ICONS.ORDERED
                                                    : STEP_ICONS.ORDER
                                            }
                                        />
                                    ),
                                },
                                {
                                    description: (
                                        <div className="flex flex-col">
                                            <span>Processed</span>
                                            <span className="ant-step-description__date">
                                                {processedDate
                                                    ? moment(processedDate)
                                                          .utc()
                                                          .format(
                                                              "MMMM.DD.YYYY hh:mm A"
                                                          )
                                                    : ""}
                                            </span>
                                        </div>
                                    ),
                                    icon: (
                                        <img
                                            src={
                                                steps[status] >=
                                                steps[statusOrders.PROCESSED]
                                                    ? STEP_ICONS.PROCESSED
                                                    : STEP_ICONS.PROCESS
                                            }
                                        />
                                    ),
                                },
                                {
                                    description: (
                                        <div className="flex flex-col">
                                            <span>In-transit</span>
                                            <span className="ant-step-description__date">
                                                {shipDate
                                                    ? moment(shipDate)
                                                          .utc()
                                                          .format(
                                                              "MMMM.DD.YYYY hh:mm A"
                                                          )
                                                    : ""}
                                            </span>
                                        </div>
                                    ),
                                    icon: (
                                        <img
                                            src={
                                                steps[status] >=
                                                steps[statusOrders.IN_TRANSIT]
                                                    ? STEP_ICONS.IN_TRANSITED
                                                    : STEP_ICONS.IN_TRANSIT
                                            }
                                        />
                                    ),
                                },
                                {
                                    description: (
                                        <div className="flex flex-col">
                                            <span>
                                                {order.status ===
                                                statusOrders.RECEIVED ? (
                                                    moment(plannedReceivedDate)
                                                        .utc()
                                                        .isAfter(
                                                            moment(
                                                                order.receivedDate
                                                            ).utc()
                                                        ) ? (
                                                        "Received"
                                                    ) : (
                                                        <span className="relative">
                                                            <Tooltip
                                                                placement="topRight"
                                                                className="icon-received__late"
                                                                title={`Planned at ${moment(
                                                                    plannedReceivedDate
                                                                )
                                                                    .utc()
                                                                    .format(
                                                                        "MMMM.DD.YYYY hh:mm A"
                                                                    )}`}
                                                            >
                                                                <InfoCircleTwoTone />
                                                            </Tooltip>
                                                            Received Late
                                                        </span>
                                                    )
                                                ) : (
                                                    "Received"
                                                )}
                                            </span>
                                            <span className="ant-step-description__date">
                                                {receivedDate
                                                    ? moment(receivedDate)
                                                          .utc()
                                                          .format(
                                                              "MMMM.DD.YYYY hh:mm A"
                                                          )
                                                    : ""}
                                            </span>
                                        </div>
                                    ),
                                    icon: (
                                        <img
                                            src={
                                                status === statusOrders.RECEIVED
                                                    ? moment(
                                                          order.plannedReceivedDate
                                                      )
                                                          .utc()
                                                          .isAfter(
                                                              moment(
                                                                  order.receivedDate
                                                              ).utc()
                                                          )
                                                        ? STEP_ICONS.RECEIVED
                                                        : STEP_ICONS.RECEIVED_LATE
                                                    : STEP_ICONS.RECEIVE
                                            }
                                        />
                                    ),
                                },
                            ]}
                        />
                        <div className="coffee-collapse mt-8 ">
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
                    </>
                )
            )}
        </div>
    );
};

export default OrderDetailAdmin;
