/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { classNames } from "../../utils/helper";
import { FieldTimeOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { selectCurrentUser, logOut } from "../../auth/authSlice";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { store } from "../../app/store";


type Nav = {
    id: number;
    name: string;
    href: string;
    current: boolean;
}

const navigation: Nav[] = [
    { id: 1, name: "Order", href: "/", current: true },
    { id: 2, name: "News", href: "/service", current: false },
    { id: 3, name: "Store", href: "/about", current: false },
    { id: 4, name: "Voucher", href: "/sign-in", current: false },
    { id: 5, name: "Career", href: "/signup", current: false },
]

function checkActiveNavbar(isActive: boolean, theme: any) {
    if (isActive && theme === "dark") {
        return "bg-slate-800 text-zinc-900 rounded-2xl"
    } else if (isActive && theme === "") {
        return "bg-white text-zinc-900 rounded-2xl"
    }
    return "text-zinc-900 hover:text-gray-400"
}

function checkActiveNavMobile(isActive: boolean, theme: any) {
    if (isActive && theme === "dark") {
        return "bg-slate-800 text-zinc-900"
    } else if (isActive && theme === "") {
        return "bg-white text-zinc-900"
    }
    return "text-zinc-900 hover:text-gray-400"
}


export default function Header() {
    const [nav, setNav] = useState(navigation);
    const currentUser = useSelector(selectCurrentUser);
    console.log(currentUser);
    const handleSwitchPage = (index: number) => {
        const stateNew: any = navigation.map((item, i) => {
            if (index === i) {
                item.current = true
            } else
                item.current = false
            return item
        })
        setNav(stateNew)
    }
    const router = useRouter();
    useEffect(() => {
        const navNew: any = navigation.map(item => {
            if (router.route === item.href) item.current = true
            else item.current = false
            return item
        })
        setNav(navNew)
    }, [router.route])

    const handleSignOut = () => {
        store.dispatch(logOut());
        window.location.reload();
    }

    return (
        <>
            <Head>
                <title>My Fullstack Blog</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" />
                <link rel="icon" href="man-working.svg" />

            </Head>
            <Disclosure as="nav" className="bg-header">
                {({ open }: any) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-20">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-custom flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                                    <Link  href="/"
                                        className="flex-shrink-0 flex items-center"
                                    >
                                        <img
                                            className="hidden lg:block h-8 w-64"
                                            src="https://order.thecoffeehouse.com/_nuxt/img/logo.174bdfd.svg"
                                            alt="The Coffee House"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:block sm:ml-6 bg-nav">
                                    <div className="flex space-x-4 h-10 p-1">
                                        {nav.map((item, index) => (
                                            <Link href={item.href} key={item.id}>
                                                <a
                                                    key={item.id}
                                                    href={item.href}
                                                    onClick={() => handleSwitchPage(index)}
                                                    className={classNames(
                                                        checkActiveNavbar(item.current, ""),
                                                        "px-3 pt-1 text-sm font-medium", item.current || "false"
                                                    )}
                                                    aria-current={item.current ? "page" : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="flex text-sm rounded-full">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://order.thecoffeehouse.com/_nuxt/img/Login.70dc3d8.png"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]">
                                                {
                                                    !isEmpty(currentUser) ?
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }: any) => (
                                                                <div
                                                                className={classNames(active ? "bg-gray-100" : "", "flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                                                                >
                                                                    <UserOutlined className="mr-2" />
                                                                    <span>{`${currentUser.firstName} ${currentUser.lastName}`}</span>
                                                                </div>
                                                            )}
                                                        </Menu.Item> 
                                                        <Menu.Item>
                                                            {({ active }: any) => (
                                                                <div
                                                                className={classNames(active ? "bg-gray-100" : "", "flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                                                                >
                                                                    <FieldTimeOutlined className="mr-2" />
                                                                    <span>Order Lookup</span>
                                                                </div>
                                                            )}
                                                        </Menu.Item> 
                                                        <Menu.Item>
                                                        {({ active }: any) => (
                                                                <div 
                                                                className={classNames(active ? "bg-gray-100" : "", "flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                                                                onClick={handleSignOut}
                                                                >
                                                                    <LogoutOutlined className="mr-2" />
                                                                    <span>Sign Out</span>
                                                                </div>
                                                        )}
                                                        </Menu.Item>
                                                    </>
                                                    :
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }: any) => (
                                                                <div
                                                                className={classNames(active ? "bg-gray-100" : "", "flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                                                                >
                                                                    <FieldTimeOutlined className="mr-2" />
                                                                    <span>Order Lookup</span>
                                                                </div>
                                                            )}
                                                        </Menu.Item> 
                                                        <Menu.Item>
                                                            {({ active }: any) => (
                                                                    <div 
                                                                    className={classNames(active ? "bg-gray-100" : "", "flex justify-start items-center px-4 py-2 text-sm text-gray-700 cursor-pointer")}
                                                                    onClick={() => { router.push("sign-in") }}
                                                                    >
                                                                        <LoginOutlined className="mr-2" />
                                                                        <span>Sign In</span>
                                                                    </div>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                }
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    <div className="flex text-sm rounded-full cursor-pointer" style={{ marginTop: "5px"}}>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://order.thecoffeehouse.com/_nuxt/img/Carticon.373916c.png"
                                            alt=""
                                            style={{
                                                height: "58px",
                                                width: "58px",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item, index) => (
                                    <Link href={item.href} key={item.id}>
                                        <Disclosure.Button
                                            onClick={() => { handleSwitchPage(index) }}
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                checkActiveNavMobile(item.current, ""),
                                                "block px-3 py-2 rounded-md text-base font-medium"
                                            )}
                                            aria-current={item.current ? "page" : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )
                }
            </Disclosure >
        </>
    )
}
