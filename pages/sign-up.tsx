import { LockClosedIcon } from "@heroicons/react/solid";
import { Form, Input, InputNumber, Select } from "antd";
import { IUser, useRegisMutation } from "../apis/user";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { delay, isJson, validatePassword } from "../utils/helper";
import { injectStyle } from "react-toastify/dist/inject-style";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useAddOrderMutation } from "../apis/order";

export default function SignUp() {
    const [form] = Form.useForm();
    const [register] = useRegisMutation();
    const [addOrder] = useAddOrderMutation();
    const router = useRouter();
    if (typeof window !== "undefined") {
        injectStyle();
    }

    const handleOnFinish = async ({
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
    }: IUser) => {
        console.log({ email, firstName, lastName, password, phoneNumber });

        phoneNumber = `${phoneNumber}`;
        const toastId = toast.loading("Process is pending...");
        await delay(2000);
        try {
            const { data } = await register({
                email,
                firstName,
                lastName,
                password,
                phoneNumber,
            }).unwrap();
            toast.update(toastId, {
                type: toast.TYPE.SUCCESS,
                render: "Sign Up Success",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
            const orderInfo = isJson(sessionStorage.getItem("orderInfo"))
                ? JSON.parse(sessionStorage.getItem("orderInfo") as string)
                : {};
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
                type: toast.TYPE.ERROR,
                render:
                    error.message ||
                    "An error occur while try to executing request",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
    };

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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign up your account
                        </h2>
                    </div>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Form
                            {...{
                                labelCol: {
                                    xs: { span: 24 },
                                    sm: { span: 8 },
                                },
                                wrapperCol: {
                                    xs: { span: 24 },
                                    sm: { span: 16 },
                                },
                            }}
                            form={form}
                            name="register"
                            style={{ maxWidth: 600 }}
                            scrollToFirstError
                            onFinish={handleOnFinish}
                            initialValues={{
                                prefixPhone: "84",
                            }}
                        >
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your first name!",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your last name!",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your phone number!",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: "email",
                                        message:
                                            "Please input your correct E-mail",
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
                                    {
                                        validator: validatePassword,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords that you entered do not match!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    xs: { span: 24 },
                                    sm: { span: 24 },
                                }}
                            >
                                <div>
                                    <button
                                        style={{
                                            background:
                                                "var(--radial-gradient-orange-4)",
                                        }}
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <LockClosedIcon
                                                className="h-5 w-5 text-indigo-500 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        Sign up
                                    </button>
                                </div>
                                <div className="text-sm flex justify-center mt-4">
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                        You do have account? Sign in{" "}
                                        <Link href="sign-in">
                                            <span
                                                className="cursor-pointer"
                                                style={{ color: "red" }}
                                            >
                                                here
                                            </span>
                                        </Link>
                                    </span>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
