import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Tag } from "antd";
import { useEffect, useState } from "react";
import { IResponseOrders, useOrdersByAdminQuery } from "../../../apis/order";
import OrderTable from "../../../components/OrderTable/OrderTable";
import OrderDetailAdmin from "../../../components/OrderDetailAdmin/OrderDetailAdmin";
import CustomSpin from "../../../components/Spin";

const OrderAdmin = ({}: {}) => {
    const { data: orders, isFetching: isFetchingOrder } = useOrdersByAdminQuery(
        {}
    );
    const [orderCurrent, setOrderCurrent] = useState({} as IResponseOrders);

    useEffect(() => {
        setOrderCurrent(orders?.[0] as IResponseOrders);
    }, []);

    return (
        <div className="w-full py-4 overflow-auto">
            <OrderTable
                isFetchingOrder={isFetchingOrder}
                orders={orders}
                setOrderCurrent={setOrderCurrent}
            />
            <Divider />
            {isFetchingOrder ? (
                <CustomSpin />
            ) : (
                <OrderDetailAdmin order={orderCurrent} />
            )}
        </div>
    );
};

export default OrderAdmin;
