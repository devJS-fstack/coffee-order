import { useEffect, useState } from "react";
import NavigationAdmin from "../../components/Navigation";
import UserPage from "./users";
import ProductAdmin from "./service/product";
import CustomSpin from "../../components/Spin";
import { delay } from "../../utils/helper";
import { ToastContainer } from "react-toastify";
import CategoryAdmin from "./service/category";
import ToppingAdmin from "./service/topping";

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
        default:
            return <UserPage {...args} />;
    }
};

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState("user");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        delay(500).then(() => {
            setIsLoading(false);
        });
    }, [page]);

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
            />
            {isLoading ? <CustomSpin /> : components(page, { collapsed })}
        </div>
    );
};

export default Admin;
