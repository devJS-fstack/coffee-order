import { useEffect, useState } from "react";
import NavigationAdmin from "../../components/Navigation"
import UserPage from "./users"
import ProductAdmin from "./product";
import CustomSpin from "../../components/Spin";
import { delay } from "../../utils/helper";

const components = (key: string, args: any) => {
    switch(key) {
        case "user":
            return <UserPage { ...args } />
        case "product":
            return <ProductAdmin { ...args }/>
        default: break;
    }
}

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
        <div className="flex">
            <NavigationAdmin collapsed={collapsed} setCollapsed={setCollapsed} setPage={setPage} setIsLoading={setIsLoading}/>
            {
                isLoading ? <CustomSpin/> : components(page, { collapsed })
            }
        </div>
    )
}

export default Admin