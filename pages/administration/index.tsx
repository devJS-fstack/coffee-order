import { useEffect, useState } from "react";
import NavigationAdmin from "../../components/Navigation";
import UserPage from "./users";
import ProductAdmin from "./service/product";
import CustomSpin from "../../components/Spin";
import { delay } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import CategoryAdmin from "./service/category";
import ToppingAdmin from "./service/topping";
import OrderAdmin from "./order";
import VoucherAdmin from "./voucher";
import { useNumberPlacedOrderQuery } from "../../apis/order";
import { socket } from "../../utils/socket";

const components = (key: string, args: any) => {
    switch (key) {
        case "user":
            return <UserPage {...args} />;
        case "product":
            return <ProductAdmin {...args} />;
        case "category":
            return <CategoryAdmin {...args} />;
        case "product":
            return <ProductAdmin {...args} />;
        case "topping":
            return <ToppingAdmin {...args} />;
        case "order":
            return <OrderAdmin {...args} />;
        case "voucher":
            return <VoucherAdmin {...args} />;
        default:
            return <UserPage {...args} />;
    }
};

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState("user");
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        setIsLoading(true);
        delay(500).then(() => {
            setIsLoading(false);
        });
    }, [page]);

    const { data: countPlacedOrder, refetch: refetchCountPlacedOrder } =
        useNumberPlacedOrderQuery({}, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onListenMessage(message: string) {
            toast.info("You just received a new order.", {
                position: "top-right",
            });
            refetchCountPlacedOrder();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("chat message", onListenMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("chat message", onListenMessage);
        };
    }, []);

    return (
        <div className="flex overflow-hidden h-screen">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: 400 }}
            />
            <NavigationAdmin
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setPage={setPage}
                setIsLoading={setIsLoading}
                refetchCountPlacedOrder={refetchCountPlacedOrder}
                countPlacedOrder={countPlacedOrder}
            />
            {isLoading ? (
                <CustomSpin />
            ) : (
                components(page, {
                    collapsed,
                    refetchCountPlacedOrder,
                    countPlacedOrder,
                })
            )}
        </div>
    );
};

export default Admin;
