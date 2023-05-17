
import { LockClosedIcon } from "@heroicons/react/solid";
import { Form, Input, message } from "antd";
import Link from "next/link";
import { useLoginMutation } from "../apis/user";
import { useAddOrderMutation } from "../apis/order";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { delay, isJson } from "../utils/helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isEmpty, toNumber } from "lodash";

export default function LoginComponent() {
    const [form] = Form.useForm();
    const [login] = useLoginMutation();
    const [addOrder] = useAddOrderMutation();
    const router = useRouter();
    if (typeof window !== "undefined") {
        injectStyle();
    }

    const handleOnFinish = async ({ email, password }: { email: string, password: string }) => {
        const toastId = toast.loading("Process is pending...");
        await delay(2000);
        try {
            const { data } = await login({ email, password }).unwrap();
            toast.update(toastId, { 
                type: toast.TYPE.SUCCESS, 
                render: "Login Success", 
                isLoading: false, 
                autoClose: 3000, 
                closeButton: true 
            });
            const orderInfo = isJson(sessionStorage.getItem("orderInfo")) ? JSON.parse(sessionStorage.getItem("orderInfo") as string) : {};
            if (!isEmpty(orderInfo)) {
                await addOrder({
                    addressReceiver: "",
                    instructionAddressReceiver: "",
                    nameReceiver: `${data.firstName} ${data.lastName}`,
                    paymentMethod: "CASH",
                    phoneReceiver: data.phoneNumber || "",
                    shippingFee: 0,
                    orderDetail: orderInfo,
                });
                sessionStorage.removeItem("orderInfo");
                router.push("/order");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            toast.update(toastId, { 
                type: toast.TYPE.ERROR, render: error.message || "An error occur while try to executing request", 
                isLoading: false, 
                autoClose: 3000, 
                closeButton: true 
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://order.thecoffeehouse.com/_nuxt/img/user-icon-gold.5f2886d.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <Form
                            {...{
                                labelCol: {
                                    xs: { span: 24 },
                                    sm: { span: 6 },
                                  },
                                wrapperCol: {
                                    xs: { span: 12 },
                                    sm: { span: 24 },
                                },
                            }}
                            form={form}
                            onFinish={handleOnFinish}
                            name="register"
                            style={{ maxWidth: 600 }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: "email",
                                        message: "Please input your correct E-mail",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input your password!",
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item 
                                wrapperCol={{
                                    xs: { span: 24 },
                                    sm: { span: 24 },
                                }}>
                            <div className="mt-2">
                                <button
                                    style={{
                                        background: "var(--radial-gradient-orange-4)",
                                    }}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                        Sign in
                                </button>
                                </div>
                                <div className="text-sm flex justify-center mt-4">
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Doesn"t have account? Sign up <Link href="sign-up"><span className="cursor-pointer" style={{ color: "red" }} >here</span></Link>
                                    </span>
                                </div>
                            </Form.Item>
                        </Form>
                </div>
            </div>
        </>
    )
}
