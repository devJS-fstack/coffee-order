import { ContainerOutlined, DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,  } from "@ant-design/icons";
import { Button, Menu, MenuProps, } from "antd"
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { FcMoneyTransfer } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { store } from "../../app/store";
import { logOut } from "../../auth/authSlice";
import { useRouter } from "next/router";
import { delay } from "../../utils/helper";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: MenuClickEventHandler,
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }


const NavigationAdmin = ({ collapsed, setCollapsed, setPage, setIsLoading, }: {
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
    setPage: Dispatch<SetStateAction<string>>
    setIsLoading: Dispatch<SetStateAction<boolean>>,
}) => {
    const router = useRouter();
    const handleChangePage = (key: string) => {
        setPage(key);
    }

    const handleSignOut = () => {
        setIsLoading(true);
        delay(1000).then(() => {
            store.dispatch(logOut());
            router.push("/");
        })
    }

    const items: MenuItem[] = [
        getItem("User", "1", <FaUser/>, () => { handleChangePage("user") }),
        getItem("Product", "2", <DesktopOutlined />, () => { handleChangePage("product") }),
        getItem("Order", "3", <FaShoppingCart />),
        getItem("Voucher", "4", <FcMoneyTransfer/>),
        getItem("Log Out", "5", <GrLogout/>, () => handleSignOut())
    ];
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ width: collapsed ? "79px" : "256px" }} className="relative">
            <Menu
                className="h-screen relative"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
            <Button className="absolute" onClick={toggleCollapsed} style={{
                    bottom: 0,
                    left: 0,
                    backgroundColor: "var(--orange-1)",
                    width: "100%"
                }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
      </div>
    )
}

export default NavigationAdmin