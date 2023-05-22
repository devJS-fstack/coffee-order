import { ContainerOutlined, DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,  } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd"
import { useState, Dispatch, SetStateAction } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { FcMoneyTransfer } from "react-icons/fc";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

const items: MenuItem[] = [
    getItem("User", "1", <FaUser />),
    getItem("Product", "2", <DesktopOutlined />),
    getItem("Order", "3", <FaShoppingCart />),
    getItem("Voucher", "4", <FcMoneyTransfer/>)
];

const NavigationAdmin = ({ collapsed, setCollapsed }: {
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
}) => {
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