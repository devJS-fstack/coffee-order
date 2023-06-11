import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Tag } from "antd";
import { useEffect, useState } from "react";
import {
    IResponseOrders,
    useLazyOrdersByAdminQuery,
    useOrdersByAdminQuery,
} from "../../apis/order";
import OrderTable from "../../components/OrderTable/OrderTable";
import OrderDetailAdmin from "../../components/OrderDetailAdmin/OrderDetailAdmin";
import CustomSpin from "../../components/Spin";
import { isEmpty } from "lodash";

const OrderAdmin = ({
    refetchCountPlacedOrder,
    countPlacedOrder,
}: {
    refetchCountPlacedOrder: any;
    countPlacedOrder: number;
}) => {
    const [
        refetchOrders,
        {
            data: orders,
            isFetching: isFetchingOrder,
            // refetch: refetchOrders,
        },
    ] = useLazyOrdersByAdminQuery();
    const [orderCurrent, setOrderCurrent] = useState({} as IResponseOrders);

    useEffect(() => {
        const orderSet: any = isEmpty(orderCurrent)
            ? { ...orders?.find((order) => order.status === "ORDERED") }
            : {
                  ...orders?.find((order) => order.id === orderCurrent.id),
              };
        setOrderCurrent(orderSet as IResponseOrders);
        if (refetchCountPlacedOrder) {
            refetchCountPlacedOrder();
        }
    }, [isFetchingOrder]);

    useEffect(() => {
        refetchOrders({});
    }, [countPlacedOrder]);

    return (
        <div
            className="w-full py-4 overflow-auto"
            style={{ overflowX: "hidden" }}
        >
            <OrderTable
                isFetchingOrder={isFetchingOrder}
                orders={orders}
                setOrderCurrent={setOrderCurrent}
            />
            <Divider />
            <OrderDetailAdmin
                refetchData={refetchOrders}
                order={orderCurrent}
                isFetchingData={isFetchingOrder}
            />
        </div>
    );
};

export default OrderAdmin;
