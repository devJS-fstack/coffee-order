import { useState } from "react";
import NavigationAdmin from "../../components/Navigation"
import UserPage from "./users"

const components = (key: string, args: any) => {
    switch(key) {
        case "user":
            return <UserPage { ...args } />
        default: break;
    }
}

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState("user");

    return (
        <div className="flex">
            <NavigationAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
            {
                components(page, { collapsed })
            }
        </div>
    )
}

export default Admin